import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import IncidentTable from './display/IncidentTable'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'

export default class GIncidentTable extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      value: Math.ceil(Math.random() * 100)
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
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

  getParams () {
    const {incidentDraw} = this.props
    const {logicalGroups, servers, monitorIds, monitorGroups} = this.props.gauge
    const q = []
    if (servers && servers.length) {
      q.push(
        `(deviceid:${servers.join(' OR ')})`
      )
    }

    let ids = []
    if (monitorIds && monitorIds.length) {
      ids = [...monitorIds]
    }

    if (monitorGroups && monitorGroups.length) {
      monitorGroups.forEach(group => {
        const index = findIndex(logicalGroups, {id: group.id})
        if (index < 0) return
        logicalGroups[index].monitorIds.forEach(monitorId => {
          if (!ids.includes(monitorId)) ids.push(monitorId)
        })
      })
    }

    if (ids.length) {
      q.push(
        `(monitorid:${ids.join(' OR ')})`
      )
    }

    const mq = [
      '(fixed:false)'
    ]

    if (q.length) {
      mq.push(`(${q.join(' OR ')})`)
    }

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

        style={this.props.style}
        className={this.props.className}
        gauge={this.props.gauge}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}

        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}
