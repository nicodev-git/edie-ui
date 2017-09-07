import React from 'react'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import {Pie} from 'react-chartjs-2'

const chartOptions = {
  legend: {
    display: false
  },
  elements: {
    line: {
      tension: 0
    }
  }
}

export default class PieChart extends React.Component {
  render () {
    const {chartData} = this.props
    return (
      <AutoSizer>
        {({ width, height }) => (
          <Pie data={chartData} options={chartOptions} width={width} height={height} />
        )}
      </AutoSizer>
    )
  }
}

// export default Dimen()(PieChart)
