import React from 'react'
import AccelView from 'react-svg-gauge'
import Dimen from 'react-dimensions'

export default class AccelMeterView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: Math.random() * 100
    }
  }
  render () {
    return (
      <AccelView
        value={this.state.value}
        width={this.props.containerWidth * 0.8}
        height={this.props.containerHeight * 0.8}
        label={this.props.title} />
    )
  }
}

export default Dimen()(AccelMeterView)
