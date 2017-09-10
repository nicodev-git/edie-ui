import React from 'react'
import Dimen from 'react-dimensions'
import D3Speedometer from 'react-d3-speedometer'

class Speedometer extends React.Component {
  render () {
    const {value, containerWidth, containerHeight} = this.props
    return (
      <D3Speedometer
        minValue={0} maxValue={100} segments={1} value={value}
        width={containerWidth}
        height={containerHeight}
      />
    )
  }
}

export default Dimen({
  elementResize: true
})(Speedometer)
