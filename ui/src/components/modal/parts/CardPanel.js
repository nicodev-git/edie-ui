import React from 'react'
import {Card, CardText} from 'material-ui'
import CardLegend from './CardLegend'
export default class CardPanel extends React.Component {
  render () {
    return (
      <div>
        <CardLegend>{this.props.title}</CardLegend>
        <Card>
          <CardText>
            {this.props.children}
          </CardText>
        </Card>
      </div>
    )
  }
}
