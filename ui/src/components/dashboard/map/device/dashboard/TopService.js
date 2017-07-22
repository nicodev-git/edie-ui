import React from 'react'
import Dimen from 'react-dimensions'
import {PieChart, Pie, Cell, Legend} from 'recharts'

const RADIAN = Math.PI / 180

class TopService extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  renderCustomizedLabel ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    const {data} = this.props

    let {name} = data[index]
    if (name.length > 15) name = `${name.substring(0, 10)}...`

    return (
      <g>
        <text x={x} y={y - 5} fill="white" textAnchor="middle" dominantBaseline="central" style={{fontSize: '11px'}}>
          {name}
        </text>
        <text x={x} y={y + 5} fill="white" textAnchor="middle" dominantBaseline="central" style={{fontSize: '11px'}}>
          {data[index].value}
        </text>
      </g>

    )
  }

  render () {
    const {data} = this.props

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A4DE6C']

    return (
      <PieChart width={this.props.containerWidth} height={this.props.containerHeight}>
        <Pie data={data} dataKey="value" cx={this.props.containerWidth / 2 - 20} cy={this.props.containerHeight / 2}
             outerRadius="100%"
             fill="#8884d8"
             label={this.renderCustomizedLabel.bind(this)} labelLine={false}>
          {
            data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
        <Legend layout="vertical" verticalAlign="top" align="right"/>
      </PieChart>
    )
  }
}

TopService.defaultProps = {
  data: []
}

export default Dimen()(TopService)
