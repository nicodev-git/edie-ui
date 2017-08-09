import React from 'react'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'
import {filterGaugeServers} from 'shared/Global'

export default class GServers extends React.Component {
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
  getMaxItemCount () {
    const {gauge}= this.props
    return 24 * (gauge.itemSize === 'slim' ? 2 : 1)
  }

  onClickItem (device) {

  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderItemView(item, total) {
    const {gauge} = this.props
    const isUp = item.status === 'UP'
    const col = Math.floor(12 / (gauge.itemSize === 'slim' ? 4 : 3) / Math.ceil(total / (gauge.itemSize === 'slim' ? 16 : 12)))
    const padding = ''
    return (
      <div key={item.id} className={`col-md-${col} text-center padding-xs ${padding}`} style={{height: gauge.itemSize === 'slim' ? '12.5%' : '25%'}}>
        <div
          className={`${isUp ? 'bg-success' : 'bg-danger'}`} style={{width: '100%', height: '100%', cursor: 'pointer'}}
          onClick={this.onClickItem.bind(this, item)}>
          <div className="div-center text-white">
            <div>{item.name}</div>
            {gauge.showDeviceType && <div><small>{item.templateName}</small></div>}
          </div>
        </div>
      </div>
    )
  }
  renderFrontView () {
    const items = filterGaugeServers(this.props.devices).slice(0, this.getMaxItemCount())
    return (
      <div className="flex-vertical flex-1">
        <div className="flex-1" style={{overflow: 'hidden'}}>
          <div className="row"   style={{height: '100%', paddingTop: 2, paddingLeft: 17, paddingRight: 17}}>
          {items.map(item => this.renderItemView(item, items.length))}
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
