import React from 'react'
import Dimen from 'react-dimensions'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'

class ServiceUsage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <BarChart width={this.props.containerWidth} height={this.props.containerHeight}
                data={this.props.data}
                margin={{top: 0, right: 0, left: 0, bottom: 0}}>
        <XAxis dataKey="label"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Bar dataKey="value" fill="#428BCA" maxBarSize={25}/>
      </BarChart>
    )
  }
}

ServiceUsage.defaultProps = {
  data: []
}

export default Dimen()(ServiceUsage)
