import React from 'react'
import Dimen from 'react-dimensions'
import D3Speedometer from 'react-d3-speedometer'

const colorGreen = '#64D10C'
const colorRed = '#F52C11'

class Speedometer extends React.Component {
  render () {
    const {value, title1, title2, title3, containerWidth, containerHeight} = this.props
    const width = Math.min(containerWidth, containerHeight)

    return (
      <div className="text-center">
        <D3Speedometer
          textColor="transparent"
          minValue={0} maxValue={100} segments={5} value={value}
          width={width}
          height={width * 0.6}
          startColor={colorGreen}
          endColor={colorRed}
          needleColor="#2B436E"
          ringWidth={width / 4}
        />
        <div className="nowrap text-ellipsis" style={{marginTop: -20}}>
          {title3}
        </div>
        <div className="nowrap text-ellipsis" style={{fontSize: 28}}>
          {title1}
        </div>
        <div className="nowrap text-ellipsis">
          {title2}
        </div>

      </div>
    )
  }
}

export default Dimen({
  elementResize: true
})(Speedometer)
