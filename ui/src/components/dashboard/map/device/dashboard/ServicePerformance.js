import React from 'react'
import Dimen from 'react-dimensions'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

class ServicePerformance extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {labels, values} = this.props.data

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A4DE6C']

    return (
      <LineChart width={this.props.containerWidth} height={this.props.containerHeight}
                 data={values}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend/>
        {
          labels.map((u, i) =>
            <Line key={i} type="monotone" dataKey={labels[i]} stroke={COLORS[i % COLORS.length]} activeDot={{r: 8}}/>
          )
        }

      </LineChart>
    )
  }
}

ServicePerformance.defaultProps = {
  data: {
    labels: [],
    values: []
  }
}

export default Dimen()(ServicePerformance)
