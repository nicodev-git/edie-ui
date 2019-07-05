import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import IncidentTable from './display/IncidentTable'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'

export default class GIncidents extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      value: Math.ceil(Math.random() * 100)
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
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

  ///////////////////////////////////////////////////////////////////

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

  getParams () {
    const {incidentDraw} = this.props

    const mq = [
      '(fixed:false)',
      `((deviceid:${this.getDeviceId()}) OR (agentid:${this.getDeviceId()}))`
    ]

    return {
      draw: incidentDraw,
      q: mq.join(' AND '),
      types: 'incident'
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderFrontView () {
    return (
      <div className="flex-vertical flex-1">
        <IncidentTable
          {...this.props}
          params={this.getParams()}
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
        />
      </div>
    )
  }
  render () {
    return (
      <FlipView
        {...this.props}

        title="[Incidents]"

        style={this.props.style}
        className={this.props.className}
        gauge={this.props.gauge}
        bodyStyle={{padding: '2px 12px'}}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}

        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}
