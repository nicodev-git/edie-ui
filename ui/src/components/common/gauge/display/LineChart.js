import React from 'react'
import Dimen from 'react-dimensions'
import {Line} from 'react-chartjs-2'

class LineChart extends React.Component {
  render () {
    const {chartData, chartOptions} = this.props
    return (
      <div style={{padding: '16px 20px 35px'}}>
        <Line data={chartData} options={chartOptions} width={this.props.containerWidth - 40} height={this.props.containerHeight - 55} />
      </div>
    )
  }
}

export default Dimen()(LineChart)
