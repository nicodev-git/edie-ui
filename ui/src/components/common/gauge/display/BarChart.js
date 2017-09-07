import React from 'react'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import {Bar} from 'react-chartjs-2'

export default class BarChart extends React.Component {
  render () {
    const {chartData, chartOptions} = this.props
    return (
      <AutoSizer>
        {({ width, height }) => (
          <Bar data={chartData} options={chartOptions} width={width} height={height} />
        )}
      </AutoSizer>
    )
  }
}
