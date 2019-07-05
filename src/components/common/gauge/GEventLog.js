import React from 'react'
import {findIndex} from 'lodash'
import {Select, MenuItem} from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'
import MonitorSocket from 'util/socket/MonitorSocket'
import InfiniteTable from 'components/common/InfiniteTable'

import {gaugeTitleStyle1} from 'style/common/materialStyles'

export default class GEventLog extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      eventLogs: [],
      logNames: [],
      selectedLogName: 'Application'
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)

    this.columns = [{
      'displayName': 'Time',
      'columnName': 'LogTime',
      'cssClassName': 'nowrap width-140'
    }, {
      'displayName': 'LogName',
      'columnName': 'LogName',
      'cssClassName': 'width-100'
    }, {
      'displayName': 'EventID',
      'columnName': 'EventID',
      'cssClassName': 'width-80'
    }, {
      'displayName': 'User',
      'columnName': 'User',
      'cssClassName': 'width-160'
    }, {
      'displayName': 'Data',
      'columnName': 'Data'
    }]
  }

  componentDidMount () {
    this.startUpdate()
  }

  componentDidUpdate (prevProps, prevState) {
    if (JSON.stringify(prevProps.gauge) !== JSON.stringify(this.props.gauge)) {
      this.stopUpdate()
      setTimeout(() => {
        this.startUpdate()
      }, 10)
    }
  }

  componentWillUnmount () {
    this.stopUpdate()
  }

  onSocketOpen () {
    this.monitorSocket.send({
      action: 'enable-realtime',
      monitors: 'eventlog',
      deviceId: this.props.device.id,
      data: {
        name: this.state.selectedLogName
      }
    })
  }
  onMonitorMessage (msg) {
    if (msg.action === 'update' && msg.deviceId === this.props.device.id) {
      const {eventlog, logNames} = msg.data
      if (!eventlog) return
      this.setState({
        eventLogs: eventlog.map((u, i) => ({...u, id: i})),
        logNames: logNames || this.state.logNames
      })
    }
  }

  startUpdate () {
    this.setState({
      eventLogs: [],
      logNames: ['Application', 'System', 'Security'],
      selectedLogName: 'Application'
    })
    this.monitorSocket = new MonitorSocket({
      listener: this.onMonitorMessage.bind(this)
    })
    this.monitorSocket.connect(this.onSocketOpen.bind(this))
  }

  stopUpdate () {
    this.monitorSocket && this.monitorSocket.close()
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  onChangeLog (e) {
    const value = e.target.value
    this.setState({
      selectedLogName: value
    })

    this.monitorSocket.send({
      action: 'enable-realtime',
      monitors: 'eventlog',
      deviceId: this.props.device.id,
      data: {
        name: value
      }
    })
  }

  onSubmit (options, values) {
    console.log(values)

    if (!values.name) {
      showAlert('Please type name.')
      return
    }
    const gauge = {
      ...this.props.gauge,
      ...values
    }

    this.props.updateDeviceGauge(gauge, this.props.device)
    options.onClickFlip()
  }

  onClickDelete () {
    this.props.removeDeviceGauge(this.props.gauge, this.props.device)
  }

  getTitle () {
    const {gauge} = this.props
    const devices = this.props.allDevices || this.props.devices
    const index = findIndex(devices, {id: gauge.deviceId})
    if (index < 0) return gauge.name
    return `[${devices[index].name}] ${gauge.name}`
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderFrontView () {
    const {logNames, selectedLogName} = this.state
    return (
      <div className="flex-vertical flex-1">
        <div style={{marginTop: -16}}>
          <FormControl>
            <InputLabel>Log</InputLabel>
            <Select value={selectedLogName} onChange={this.onChangeLog.bind(this)}>
              {logNames.map(p =>
                <MenuItem key={p} value={p}>{p}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div className="flex-1">
          <InfiniteTable
            cells={this.columns}
            ref="table"
            rowMetadata={{'key': 'id'}}
            selectable
            data={this.state.eventLogs}
            useExternal={false}
          />
        </div>
      </div>
    )
  }
  renderBackView (options) {
    return (
      <div>
        <GEditView
          {...this.props}
          onSubmit={this.onSubmit.bind(this, options)}
          hideSplit
        />
      </div>
    )
  }
  render () {
    return (
      <FlipView
        {...this.props}

        titleStyle={gaugeTitleStyle1}
        style={this.props.style}
        className={this.props.className}
        gauge={this.props.gauge}
        title={this.getTitle()}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}

        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}
