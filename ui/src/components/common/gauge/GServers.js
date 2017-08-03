import React from 'react'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'

export default class GServers extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      devices: []
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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderItemView(item) {
    const isUp = item.status === 'UP'

    return (
      <div key={item.id} className={`col-md-4 text-center padding-xs`} style={{height: '25%'}}>
        <div className={`${isUp ? 'bg-success' : 'bg-danger'}`} style={{width: '100%', height: '100%'}}>
          <div className="div-center text-white">
            {item.name}<br/>
            <small>{item.templateName}</small>
          </div>
        </div>
      </div>
    )
  }
  renderFrontView () {
    const items = (this.props.devices || [])
      .filter(p => p.templateName !== 'Long hub' && p.templateName !== 'Free Text' )
      .slice(0, 12)
    return (
      <div className="flex-vertical flex-1">
        <div className="flex-1">
          <div className="row"   style={{height: '100%'}}>
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
