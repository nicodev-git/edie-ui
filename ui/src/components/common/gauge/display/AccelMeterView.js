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
      <div className="text-center">
        <AccelView
          value={this.state.value}
          width={Math.min(this.props.containerWidth, this.props.containerHeight * 2) * 0.7}
          height={this.props.containerHeight * 0.8}
          label=""
        />
      </div>
    )
  }
}

export default Dimen()(AccelMeterView)
