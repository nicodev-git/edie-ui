import React from 'react'
import Dimen from 'react-dimensions'
import {Bar} from 'react-chartjs-2'

class BarChart extends React.Component {
  render () {
    const {chartData, chartOptions} = this.props
    return (
      <div style={{padding: '16px 20px 35px'}}>
        <Bar data={chartData} options={chartOptions} width={this.props.containerWidth - 40} height={this.props.containerHeight - 55} />
      </div>
    )
  }
}

export default Dimen()(BarChart)
