import React from 'react'
import Dimen from 'react-dimensions'
import {Bar} from 'react-chartjs-2'

class BarChart extends React.Component {
  render () {
    const {chartData, chartOptions} = this.props
    return (
      <Bar data={chartData} options={chartOptions} width={this.props.containerWidth || 100} height={this.props.containerHeight || 100} />
    )
  }
}

export default Dimen()(BarChart)
