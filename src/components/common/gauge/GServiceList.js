import React from 'react'
import {findIndex, keys} from 'lodash'
import {Button, CircularProgress} from '@material-ui/core'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'
import MonitorSocket from 'util/socket/MonitorSocket'
import InfiniteTable from 'components/common/InfiniteTable'

import {gaugeTitleStyle1} from 'style/common/materialStyles'
import {getMonitorResult, getBasicMonitorInfo} from 'shared/Global'

export default class GServiceList extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      services: [],
      waiting: {}
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)

    this.columns = [{
      'displayName': 'Name',
      'columnName': 'ServiceName',
      'cssClassName': 'width-200'
    }, {
      'displayName': 'Display Name',
      'columnName': 'DisplayName'
    }, {
      'displayName': '    ',
      'columnName': 'Status',
      'cssClassName': 'width-200',
      'customComponent': (p) => {
        const val = p.data
        const label = val === 'Running' ? 'Stop' : 'Start'
        const waiting = this.state.waiting[p.rowData.ServiceName]
        return (
          <div>
            <Button variant="raised" onClick={this.onClickStart.bind(this, p.rowData)}
                    color={val !== 'Running' ? 'primary' : null} disabled={waiting}>
              {label}
            </Button>
            {waiting && <CircularProgress size={24} className="valign-middle margin-lg-left"/>}
          </div>
        )
      }
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

  startUpdate () {
    this.setState({
      services: [],
      waiting: {}
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
  getServiceStatus(services, name) {
    const index = findIndex(services, {ServiceName: name})
    if (index < 0) return ''
    return services[index].Status
  }

  onSocketOpen () {
    this.monitorSocket.send({
      action: 'enable-realtime',
      monitors: 'service',
      deviceId: this.props.device.id
    })
  }

  onMonitorMessage (msg) {
    if (msg.action === 'update' && msg.deviceId === this.props.device.id) {
      const {service} = msg.data
      const {waiting, services} = this.state

      const updatedWaiting = {}
      keys(waiting).forEach(p => {
        if (this.getServiceStatus(services, p) !== this.getServiceStatus(service, p)) return
        updatedWaiting[p] = true
      })
      this.setState({
        services: service,
        waiting: updatedWaiting
      })
    }
  }
  sendCommandMessage (name, params) {
    this.monitorSocket.send({
      action: 'command',
      deviceId: this.props.device.id,
      data: {
        name,
        params
      }
    })
  }
  onClickStart (service) {
    if (service.Status === 'Running') {
      this.sendCommandMessage('StopServiceCommand', {service: service.ServiceName})
    } else {
      this.sendCommandMessage('StartServiceCommand', {service: service.ServiceName})
    }

    const {waiting} = this.state
    waiting[service.ServiceName] = true

    this.setState({
      waiting
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
    const device = this.getDevice()
    const basicMonitor = getBasicMonitorInfo(device)
    const services = getMonitorResult(device, 'service') || (basicMonitor ? basicMonitor.service : null)

    return (
      <InfiniteTable
        cells={this.columns}
        ref="table"
        rowMetadata={{'key': 'ServiceName'}}
        selectable
        rowHeight={40}

        useExternal={false}
        data={services}
      />
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
