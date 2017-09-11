import React from 'react'
import Dimen from 'react-dimensions'
import D3Speedometer from 'react-d3-speedometer'

const colorGreen = '#65CE67'
const colorRed = '#EF5A5A'

class Speedometer extends React.Component {
  render () {
    const {value, containerWidth, containerHeight} = this.props
    return (
      <D3Speedometer
        textColor="transparent"
        minValue={0} maxValue={100} segments={2} value={value}
        width={containerWidth}
        height={containerHeight}
        startColor={value > 50 ? colorRed : colorGreen}
        endColor={value > 50 ? colorRed : colorGreen}
        needleColor="#2B436E"
      />
    )
  }
}

export default Dimen({
  elementResize: true
})(Speedometer)
