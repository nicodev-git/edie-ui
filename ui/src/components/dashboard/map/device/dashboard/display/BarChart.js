import React from 'react'
import Dimen from 'react-dimensions'
import {Bar} from 'react-chartjs-2'

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

class BarChart extends React.Component {
  render () {
    const {chartData} = this.props
    return (
      <Bar data={chartData} options={chartOptions} width={this.props.containerWidth} height={this.props.containerHeight} />
    )
  }
}

export default Dimen()(BarChart)
