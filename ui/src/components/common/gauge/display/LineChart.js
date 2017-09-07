import React from 'react'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import {Line} from 'react-chartjs-2'

export default class LineChart extends React.Component {
  render () {
    const {chartData, chartOptions} = this.props
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Line data={chartData} options={chartOptions} width={width} height={height} />
        )}
      </AutoSizer>
    )
  }
}
