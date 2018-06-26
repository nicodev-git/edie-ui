import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'
import MonitorSocket from 'util/socket/MonitorSocket'
import InfiniteTable from 'components/common/InfiniteTable'

import {gaugeTitleStyle1} from 'style/common/materialStyles'
import {getMonitorResult, getBasicMonitorInfo} from 'shared/Global'

export default class GUsers extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      users: []
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)

    this.columns = [{
      'displayName': 'Name',
      'columnName': 'Name',
      'cssClassName': 'width-200'
    }, {
      'displayName': 'Domain',
      'columnName': 'Domain'
    }, {
      'displayName': 'Status',
      'columnName': 'Disabled',
      'customComponent': p => {
        return <span>{p.data ? 'Disabled' : 'Enabled'}</span>
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
      services: []
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

  onSocketOpen () {
    this.monitorSocket.send({
      action: 'enable-realtime',
      monitors: 'user',
      deviceId: this.props.device.id
    })
  }
  onMonitorMessage (msg) {
    if (msg.action === 'update' && msg.deviceId === this.props.device.id) {
      const {user} = msg.data
      this.setState({
        users: user
      })
    }
  }
  onClickCreate () {
    this.props.showLocalUserModal(true)
  }
  onSaveUser (values) {
    this.sendCommandMessage('CreateUserCommand', values)
  }
  onClickDeleteUser () {
    // const sel = this.refs.table.getSelected()
    // if (!sel) return
    // showConfirm('Click OK to delete user.', btn => {
    //   if (btn !== 'ok') return
    //   this.sendCommandMessage('DeleteUserCommand', {
    //     username: sel.Name
    //   })
    // })
  }
  onClickEnable () {
    const sel = this.refs.table.getSelected()
    if (!sel) return
    this.sendCommandMessage('EnableUserCommand', {
      username: sel.Name
    })
  }
  onClickDisable () {
    const sel = this.refs.table.getSelected()
    if (!sel) return
    this.sendCommandMessage('DisableUserCommand', {
      username: sel.Name
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

  getDeviceId () {
    return this.props.gauge.deviceId
  }

  getDevice () {
    const {devices} = this.props
    const index = findIndex(devices, {id: this.getDeviceId()})
    if (index < 0) return null
    return devices[index]
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderFrontView () {
    const device = this.getDevice()
    const basicMonitor = getBasicMonitorInfo(device)
    const users = getMonitorResult(device, 'user') || (basicMonitor ? basicMonitor.user : null)

    return (
      <InfiniteTable
        cells={this.columns}
        ref="table"
        rowMetadata={{'key': 'Name'}}
        selectable
        rowHeight={40}

        useExternal={false}
        data={users || []}
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
