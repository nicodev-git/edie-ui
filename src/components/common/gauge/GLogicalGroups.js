import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'

export default class GLogicalGroups extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
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

  getItems () {
    const allGroups = this.props.monitorGroups
    const {gauge}= this.props
    if (!gauge.logicalGroups || !gauge.logicalGroups.length) return allGroups

    const items = []

    gauge.logicalGroups.forEach(p => {
      const index = findIndex(allGroups, {id: p.id})
      if (index < 0) return
      items.push(allGroups[index])
    })

    return items
  }

  onClickItem (item) {
    const {gauge} = this.props
    const index = findIndex(gauge.logicalGroups || [], {id: item.id})
    if (index < 0) return
    const {dashboardId} = gauge.logicalGroups[index]
    if (!dashboardId) return

    this.props.history.push({
      pathname: `/dashboard/${dashboardId}`
    })
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderItemView(item) {
    const {gauge} = this.props
    const isUp = item.status === 'UP'
    return (
      <div key={item.id} className={`server-cell ${gauge.itemSize === 'slim' ? 'slim' : ''}`}>
        <div
          className={`${isUp ? 'bg-success' : 'bg-danger'}`} style={{width: '100%', height: '100%', cursor: 'pointer'}}
          onClick={this.onClickItem.bind(this, item)}>
          <div className="div-center text-white">{item.name}</div>
        </div>
      </div>
    )
  }

  renderFrontView () {
    const items = this.getItems()
    return (
      <div className="flex-vertical flex-1">
        <div className="flex-1" style={{overflow: 'hidden'}}>
          <div style={{height: '100%', overflow: 'auto'}}>
            {items.map(item => this.renderItemView(item))}
          </div>
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
          hideDuration
          hideSplit
        />
      </div>
    )
  }
  render () {
    return (
      <FlipView
        {...this.props}

        hideHeader
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
