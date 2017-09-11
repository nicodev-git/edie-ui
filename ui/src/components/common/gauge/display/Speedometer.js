import React from 'react'
import Dimen from 'react-dimensions'
import D3Speedometer from 'react-d3-speedometer'

const colorGreen = '#65CE67'
const colorRed = '#EF5A5A'

class Speedometer extends React.Component {
  render () {
    const {value, title1, title2, title3, containerWidth} = this.props
    const width = containerWidth
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
        <div className="nowrap text-ellipsis" style={{fontSize: 28, marginTop: -20}}>
          {title1}
        </div>
        <div className="nowrap text-ellipsis">
          {title2}
        </div>
        <div className="nowrap text-ellipsis">
          {title3}
        </div>

      </div>
    )
  }
}

export default Dimen({
  elementResize: true
})(Speedometer)
