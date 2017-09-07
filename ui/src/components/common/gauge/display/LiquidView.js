import React from 'react'
import { color } from 'd3-color'
import { interpolateRgb } from 'd3-interpolate'
import LiquidFillGauge from 'react-liquid-gauge'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'

const startColor = '#6495ed'; // cornflowerblue
const endColor = '#dc143c'; // crimson

export default class LiquidView extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     value: Math.random() * 100
  //   }
  // }

  render () {
    const {value, title} = this.props

    const interpolate = interpolateRgb(startColor, endColor);
    const fillColor = interpolate(value / 100);
    const gradientStops = [
      {
        key: '0%',
        stopColor: color(fillColor).darker(0.5).toString(),
        stopOpacity: 1,
        offset: '0%'
      },
      {
        key: '50%',
        stopColor: fillColor,
        stopOpacity: 0.75,
        offset: '50%'
      },
      {
        key: '100%',
        stopColor: color(fillColor).brighter(0.5).toString(),
        stopOpacity: 0.5,
        offset: '100%'
      }
    ];

    return (
      <AutoSizer>
        {({ height, width }) => {
          const radius = Math.max(Math.min(width, height || 100) * 0.48, 10);
          return (
            <div className="text-center" style={{paddingTop: (height || 100) / 2 - radius}}>
              <LiquidFillGauge
                style={{ margin: '0 auto' }}
                width={radius * 2}
                height={radius * 2}
                value={value}
                percent="%"
                textSize={1}
                textOffsetX={0}
                textOffsetY={0}
                textRenderer={(props) => {
                  const value = props.value;
                  const radius = Math.min(props.height / 2, props.width / 2);
                  const textPixels = (props.textSize * radius / 2);
                  const valueStyle = {
                    fontSize: textPixels
                  };
                  const percentStyle = {
                    fontSize: textPixels * 0.6
                  };

                  return (
                    <tspan>
                      <tspan className="value" style={valueStyle}>{value}</tspan>
                      <tspan style={percentStyle}>{props.percent}</tspan>
                    </tspan>
                  );
                }}
                riseAnimation={false}
                waveAnimation={false}
                waveFrequency={2}
                waveAmplitude={1}
                gradient
                gradientStops={gradientStops}
                circleStyle={{
                  fill: fillColor
                }}
                waveStyle={{
                  fill: fillColor
                }}
                textStyle={{
                  fill: color('#444').toString(),
                  fontFamily: 'Arial'
                }}
                waveTextStyle={{
                  fill: color('#fff').toString(),
                  fontFamily: 'Arial'
                }}
              />
              <div className="text-center">{title}</div>
            </div>
          )
        }}
      </AutoSizer>
    )
  }
}

// export default Dimen({
//   elementResize: true
// })(LiquidView)
