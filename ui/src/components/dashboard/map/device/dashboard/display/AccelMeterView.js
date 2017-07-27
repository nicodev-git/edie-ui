import React from 'react'
import AccelView from 'react-svg-gauge'
import Dimen from 'react-dimensions'

class AccelMeterView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: parseInt(Math.random() * 100, 10)
    }
  }
  render () {
    return (
      <div className="padding-md">
        <AccelView
          value={this.state.value}
          width={this.props.containerWidth - 32}
          height={this.props.containerHeight - 50}
          label=""
        />
        <div className="text-center">{this.props.title}</div>
      </div>
    )
  }
}

export default Dimen()(AccelMeterView)
