import React, { Component } from 'react'
import { assign, concat } from 'lodash'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'

import CheckIcon from 'material-ui/svg-icons/toggle/check-box'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import HelpIcon from 'material-ui/svg-icons/action/help'
import CommentIcon from 'material-ui/svg-icons/action/description'
import DateRangeIcon from 'material-ui/svg-icons/action/date-range'

import MonitorWizardContainer from 'containers/shared/wizard/MonitorWizardContainer'
import InfiniteTable from 'components/shared/InfiniteTable'

import { showAlert } from 'components/shared/Alert'

import MonitorPicker from './MonitorPicker'
import MonitorHistoryModal from './MonitorHistoryModal'
import IncidentSocket from 'util/socket/IncidentSocket'
import MonitorSocket from 'util/socket/MonitorSocket'

export default class MonitorTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editMonitor: null,

      monitorConfig: null
    }
    this.columns = [{
      'displayName': 'Monitor Name',
      'columnName': 'name',
      'cssClassName': 'nowrap'
    }, {
      'displayName': 'Type',
      'columnName': 'monitortype'
    }, {
      'displayName': 'Result',
      'columnName': 'checkResult.resultdata'
    }, {
      'displayName': 'Status',
      'columnName': 'status',
      'cssClassName': 'text-center',
      'customComponent': (props) => {
        return this.healthFormatter(props.data)
      }
    }, {
      'displayName': 'Last Seen',
      'columnName': 'lastrun',
      'cssClassName': 'nowrap',
      'customComponent': (props) => {
        if (!props.data) return <span />
        return <span>{moment(props.data).fromNow()}</span>
      }
    }, {
      'displayName': 'Last Failed',
      'columnName': 'lastfalure',
      'cssClassName': 'nowrap',
      'customComponent': (props) => {
        if (!props.data) return <span />
        return <span>{moment(props.data).fromNow()}</span>
      }
    }, {
      'displayName': 'Last Success',
      'columnName': 'lastsuccess',
      'cssClassName': 'nowrap',
      'customComponent': (props) => {
        if (!props.data) return <span />
        return <span>{moment(props.data).fromNow()}</span>
      }
    }, {
      'displayName': 'Actions',
      'columnName': 'action',
      'customComponent': (props) => {
        const row = props.rowData

        return (
          <div>
            <CommentIcon color="#545454" data-tip={row.checkResult ? JSON.stringify(row.checkResult) : ''}/>
            <DateRangeIcon color="#545454" data-tip="History" onClick={this.onClickCal.bind(this, props.rowData)}/>
          </div>
        )
      }
    }]
  }

  componentDidMount () {
    this.incidentSocket = new IncidentSocket({
      listeners: {
        'updatedDevice': this.onDeviceUpdated.bind(this)
      }
    })
    this.incidentSocket.connect(this.onSocketOpen.bind(this))

    this.monitorSocket = new MonitorSocket({
      listener: this.onMonitorMessage.bind(this)
    })
    this.monitorSocket.connect(this.onSocketOpen.bind(this))
  }

  componentWillUnmount () {
    this.incidentSocket.close()
    this.monitorSocket.close()
  }

  onSocketOpen () {
    this.monitorSocket.send({
      action: 'enable-realtime',
      monitors: 'basic',
      deviceId: this.props.device.id
    })
  }
  onMonitorMessage (msg) {
    console.log(msg)
    if (msg.action === 'update' && msg.deviceId === this.props.device.id) {
      this.props.updateMonitorRealTime(msg.data)
    }
  }
  onDeviceUpdated (msg) {
    const {device} = this.props
    if (device.id !== msg.id) return
    this.props.reloadDevice(msg)
  }

  healthFormatter (val) {
    let cls = <HelpIcon color="#FDB422"/>
    if (val === 'UP') {
      cls = <CheckIcon color="green"/>
    } else if (val === 'DOWN') {
      cls = <CloseIcon color="red"/>
    }
    return (
      <div className="text-center">
        {cls}
      </div>
    )
  }

  onRowDblClick () {
    this.onClickEditMonitor()
  }

  onClickCal (row) {
    this.props.showMonitorHistoryModal(true, row)
  }

  onClickAddMonitor () {
    this.showMonitorAdd()
  }

  showMonitorAdd () {
    this.setState({ editMonitor: null }, () => {
      this.props.openDeviceMonitorPicker()
    })
  }

  addMonitor (type) {
    this.props.openDeviceMonitorWizard()
    return true
  }

  onFinishMonitorWizard (res, params) {
    let editMonitor = this.state.editMonitor
    let device = assign({}, this.props.device)
    let monitor = assign({}, editMonitor, params)

    if (editMonitor) {
      // Edit
      const index = device.monitors.indexOf(editMonitor)
      if (index >= 0) device.monitors[index] = monitor
    } else {
      // Add

      const {monitorConfig} = this.state
      assign(monitor, {
        monitortype: monitorConfig.monitortype
      })

      device.monitors = concat(device.monitors || [], monitor)
    }

    this.props.updateMapDevice(device)
    this.props.closeDeviceMonitorWizard()
  }

  onStep0 () {
    this.onClickAddMonitor()
  }

  onClickEditMonitor () {
    let selected = this.getTable().getSelected()

    if (!selected) return showAlert('Please select monitor.')

    this.setState({ editMonitor: selected }, () => {
      this.props.openDeviceMonitorWizard(selected)
    })
  }

  onClickDeleteMonitor () {
    let data = this.getTable().getSelected()
    if (!data) return showAlert('Please choose monitor.')

    let device = assign({}, this.props.device)
    const index = device.monitors.indexOf(data)
    if (index >= 0) device.monitors.splice(index, 1)

    this.props.updateMapDevice(device)
  }

  getTable () {
    return this.refs.table
  }

  renderMonitorPicker () {
    if (!this.props.monitorPickerVisible) return null

    return (
      <MonitorPicker
        {...this.props}
        onClickItem={monitorConfig => {
          this.setState({monitorConfig}, () => {
            this.addMonitor()
          })
          return true
        }}
      />
    )
  }

  renderMonitorWizard () {
    if (!this.props.monitorWizardVisible) return null

    const {monitorConfig} = this.state
    const type = 'monitor-custom'
    return (
      <MonitorWizardContainer
        deviceType={type}
        title={monitorConfig ? monitorConfig.name : ''}
        onClose={() => {
          this.props.closeDeviceMonitorWizard()
        }}
        onStep0={this.onStep0.bind(this)}
        extraParams={{}}
        configParams={{}}
        onFinish={this.onFinishMonitorWizard.bind(this)}
      />
    )
  }

  renderHistoryModal () {
    if (!this.props.monitorHistoryModalOpen) return null
    return (
      <MonitorHistoryModal device={this.props.selectedMonitor} onClose={() => this.props.showMonitorHistoryModal(false)}/>
    )
  }

  render () {
    return (
      <div className="flex-1 flex-vertical">
        <InfiniteTable
          cells={this.columns}
          ref="table"
          rowMetadata={{'key': 'name'}}
          selectable
          onRowDblClick={this.onRowDblClick.bind(this)}

          useExternal={false}
          data={this.props.device.monitors}
        />

        {this.renderMonitorPicker()}

        {this.renderMonitorWizard()}
        {this.renderHistoryModal()}
        <ReactTooltip/>
      </div>
    )
  }
}
