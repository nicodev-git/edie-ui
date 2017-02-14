import React, { Component } from 'react'
import TimeAgo from 'react-timeago'
import { assign, concat } from 'lodash'

import DeviceWizardContainer from '../../../../../containers/shared/wizard/DeviceWizardContainer'
import { ResponsiveInfiniteTable } from 'components/shared/InfiniteTable'

import { appendComponent, removeComponent } from '../../../../../util/Component'
import { showAlert } from '../../../../shared/Alert'

import MonitorPicker from './MonitorPicker'
import MonitorHistoryModal from './MonitorHistoryModal'

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
      'columnName': 'devicetype'
    }, {
      'displayName': 'Result',
      'columnName': 'devicestatustext',
      'customComponent': (props) => {
        try {
          let statusObj = JSON.parse(val) // eslint-disable-line no-undef
          if (!statusObj['text']) return (<span />)
          return (<span>{statusObj['text']}</span>)
        } catch (e) {}
        return (<span />)
      }
    }, {
      'displayName': 'Status',
      'columnName': 'devicestatus',
      'cssClassName': 'text-center',
      'customComponent': (props) => {
        return this.healthFormatter(props.data)
      }
    }, {
      'displayName': 'Last Seen',
      'columnName': 'devicestatustimestamp',
      'cssClassName': 'nowrap',
      'customComponent': (props) => {
        if (!props.data) return <span />
        return <TimeAgo date={props.data}/>
      }
    }, {
      'displayName': 'Last Failed',
      'columnName': 'lastfailed',
      'cssClassName': 'nowrap',
      'customComponent': (props) => {
        if (!props.data) return <span />
        return <TimeAgo date={props.data}/>
      }

    }, {
      'displayName': 'Actions',
      'columnName': 'action',
      'customComponent': (props) => {
        let row = props.rowData
        let devtype = row.type

        return (
          <span>
            <a href="javascript:;" className="option">
              <i className="fa fa-comment" data-tip={row.devicestatustext} />
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

  lastSeenDateFormatter (date, display) {
    if (!date) return ''

    let diff = (new Date() - new Date(date)) / 1000
    diff = diff.toFixed(0)
    if (diff < 1) diff = 1
    let label = ''

    if (diff < 60) {
      label = `${diff + (diff > 1 ? ' seconds' : ' second')} ago`
    } else if (diff < 3600) {
      diff = parseInt(diff / 60)
      if (diff === 1) {
        label = `${diff} minute ago`
      } else {
        label = `${diff} minutes ago`
      }
    } else {
      diff = parseInt(diff / 3600)
      if (diff === 1) {
        label = `${diff} hour ago`
      } else {
        label = `${diff} hours ago`
      }
    }

    return label
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
      <DeviceWizardContainer
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

    // MonitorHistoryModal
    appendComponent(
      <MonitorHistoryModal
        device={data}
        onClose={removeComponent}
      />
    )
  }

  onClickLog (row) {
    let data = row

    // appendComponent(
    //     <MonitorLogModal
    //         device={ data }
    //         father={ this.props.device }
    //         onClose={ removeComponent }
    //         />
    // )

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
    return this.refs.table.refs.wrappedInstance
  }

  render () {
    return (
      <div className="flex-1 flex-vertical">
        <ResponsiveInfiniteTable
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
      </div>
    )
  }
}
