import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'
import MonitorSocket from 'util/socket/MonitorSocket'
import InfiniteTable from 'components/common/InfiniteTable'

import {gaugeTitleStyle1} from 'style/common/materialStyles'

export default class GWorkflows extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)

    this.cells = [{
      'displayName': 'Name',
      'customHeaderComponent': this.renderColHeader.bind(this),
      'columnName': 'name'
    }, {
      'displayName': 'Category',
      'customHeaderComponent': this.renderColHeader.bind(this),
      'columnName': 'category'
    }, {
      'displayName': 'Severity',
      'customHeaderComponent': this.renderColHeader.bind(this),
      'columnName': 'severity'
    }, {
      'displayName': 'Description',
      'customHeaderComponent': this.renderColHeader.bind(this),
      'columnName': 'desc'
    }, {
      'displayName': 'Global',
      'columnName': 'isglobal',
      'customHeaderComponent': this.renderColHeader.bind(this),
      'customComponent': p => {
        return <span>{p.data ? 'YES' : 'NO'}</span>
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
      apps: []
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
      monitors: 'app',
      deviceId: this.props.gauge.deviceId
    })
  }
  onMonitorMessage (msg) {
    if (msg.action === 'update' && msg.deviceId === this.props.gauge.deviceId) {
      const {app} = msg.data
      if (!app) return
      this.setState({
        apps: app.map((u, i) => ({...u, id: i}))
      })
    }
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

  getApps () {
    // const {gauge} = this.props
    const {apps} = this.state
    // const dateFrom = moment().add(-gauge.duration, `${gauge.durationUnit}s`).startOf('day').valueOf()
    // return apps.filter(p => moment(p.InstallDate, 'YYYY-MM-DD').valueOf() >= dateFrom)
    return apps
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
    return (
      <div className="flex-vertical flex-1">
        <InfiniteTable
          cells={this.columns}
          ref="table"
          rowMetadata={{'key': 'id'}}
          selectable
          data={this.getApps()}
          useExternal={false}
        />
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
