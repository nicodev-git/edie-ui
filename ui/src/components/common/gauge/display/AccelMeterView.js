import React from 'react'
import AccelView from 'react-svg-gauge'
import Dimen from 'react-dimensions'

class AccelMeterView extends React.Component {
  render () {
    return (
      <div className="text-center svg-accel" style={{width: '100%', height: '100%', position: 'relative'}}>
        <AccelView
          value={this.props.value}
          width={Math.min(this.props.containerWidth, this.props.containerHeight * 2) * 0.9}
          height={this.props.containerHeight * 0.8}
          label=""
        />
      </div>
    )
  }
}

export default Dimen()(AccelMeterView)
