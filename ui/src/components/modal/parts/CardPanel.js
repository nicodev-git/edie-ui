import React from 'react'
import {Card, CardText} from 'material-ui'
import CardLegend from './CardLegend'
export default class CardPanel extends React.Component {
  render () {
    return (
      <div className={this.props.className} style={this.props.style}>
        <CardLegend>
          {this.props.title}
          {this.props.tools}
        </CardLegend>
        <Card>
          <CardText>
            {this.props.children}
          </CardText>
        </Card>
      </div>
    )
  }
}
