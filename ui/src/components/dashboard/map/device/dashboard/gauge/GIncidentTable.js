import React from 'react'

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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderFrontView () {
    const {gauge} = this.props

    return (
      <div className="flex-1">
        <IncidentTable device={this.props.device} />
      </div>
    )
  }
  renderBackView (options) {
    return (
      <div>
        <GEditView
          searchList={this.props.searchList}
          gauge={this.props.gauge}
          monitors={this.props.monitors}
          onSubmit={this.onSubmit.bind(this, options)}
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
