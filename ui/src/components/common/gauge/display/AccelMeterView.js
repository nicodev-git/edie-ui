import React from 'react'
import AccelView from 'react-svg-gauge'
import Dimen from 'react-dimensions'

class AccelMeterView extends React.Component {
  render () {
    return (
      <div className="text-center" style={{position: 'relative'}}>
        <AccelView
          value={this.props.value}
          width={this.props.containerWidth * 0.8}
          height={this.props.containerHeight}
          label=""
        />
      </div>
    )
  }
}

export default Dimen()(AccelMeterView)
