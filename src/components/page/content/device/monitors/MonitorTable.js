import React, { Component } from 'react'
import { assign, concat, debounce } from 'lodash'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'

import MonitorWizardContainer from 'containers/shared/wizard/MonitorWizardContainer'
import InfiniteTable from 'components/shared/InfiniteTable'

import { appendComponent, removeComponent } from '../../../../../util/Component'
import { showAlert } from '../../../../shared/Alert'

import MonitorPicker from './MonitorPicker'
import MonitorHistoryModal from './MonitorHistoryModal'
// import IncidentSocket from 'util/socket/IncidentSocket'
import MonitorSocket from 'util/socket/MonitorSocket'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { store } from 'shared/GetStore'

export default class MonitorTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editMonitor: null,

      monitorConfig: null
    }
    let tooltipRebuild = debounce(ReactTooltip.rebuild, 200)

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
        let row = props.rowData
        let devtype = row.type

        tooltipRebuild()

        return (
          <span>
            <a href="javascript:;" className="option">
              <i className="fa fa-comment" data-tip={row.checkResult ? JSON.stringify(row.checkResult) : ''} />
            </a>
            <a href="javascript:;" className="option" onClick={this.onClickCal.bind(this, props.rowData)}>
              <i className="fa fa-calendar-o" data-tip="History" />
            </a>
          {
            (devtype === 'LogFile' || devtype === 'LogCheck')
              ? <a href="javascript:;" className="option" onClick={this.onClickLog.bind(this, props.rowData)}>
                    <i className="fa fa-list" title="Log" />
                </a>
              : null
          }
          </span>
        )
      }
    }]
  }

  componentDidMount () {
    // this.incidentSocket = new IncidentSocket({
    //   listeners: {
    //     'updatedDevice': this.onDeviceUpdated.bind(this)
    //   }
    // })
    // this.incidentSocket.connect(this.onSocketOpen.bind(this))

    this.monitorSocket = new MonitorSocket({
      listener: this.onMonitorMessage.bind(this)
    })
    this.monitorSocket.connect(this.onSocketOpen.bind(this))
  }

  componentWillUnmount () {
    // this.incidentSocket.close()
    this.monitorSocket.close()
  }

  onSocketOpen () {
    this.monitorSocket.send({
      action: 'enable-realtime',
      deviceId: this.props.device.id
    })
  }
  onMonitorMessage () {
  }
  onDeviceUpdated (msg) {
    const {device} = this.props
    if (device.id !== msg.id) return
    this.props.reloadDevice(msg)
  }

  healthFormatter (val) {
    let cls = 'fa-question'
    let color = '#FDB422'
    if (val === 'UP') {
      cls = 'fa-check-square'
      color = 'green'
    } else if (val === 'DOWN') {
      cls = 'fa-times'
      color = 'red'
    }
    return (
      <div style={{width: '100%', textAlign: 'center'}}>
        <i className={`fa ${cls}`} style={{color: color, fontSize: '20px', verticalAlign: 'middle'}} />
      </div>
    )
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

  onRowDblClick () {
    this.onClickEditMonitor()
  }

  onClickCal (row) {
    let data = row
    appendComponent(
      <MonitorHistoryModal
        device={data}
        onClose={removeComponent}
      />
    )
  }

  onClickLog (row) {
    let data = row
    emit(EVENTS.DEV_MONITOR_LOG_CLICKED, data, this.props.device) // eslint-disable-line no-undef
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

  editPortMonitors (type) {

  }

  onFinishPorts (res, req) {

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

  render () {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
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
            <ReactTooltip/>
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}
