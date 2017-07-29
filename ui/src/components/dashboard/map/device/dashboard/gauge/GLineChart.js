import React from 'react'
import FlipView from './FlipView'

export default class GLineChart extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: false
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
  }
  renderFrontView () {

  }
  renderBackView () {

  }
  render () {
    return (
      <FlipView
        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}
      />
    )
  }
}
