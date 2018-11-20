import React from 'react'
import {Card, CardContent} from '@material-ui/core'
import BackIcon from '@material-ui/icons/KeyboardArrowLeft'
import CardLegend from './CardLegend'

export default class CardPanel extends React.Component {
  render() {
    const {contentStyle} = this.props
    return (
      <div className={this.props.className} style={this.props.style}>
        <CardLegend>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            {this.props.isBack && (
              <BackIcon className="modal-back" onClick={this.props.onBack} />
            )}
            <span>{this.props.title}</span>
          </div>
          {this.props.leftTools}
          {this.props.tools ? (
            <div className="pull-right" style={{marginTop: -8}}>
              {this.props.tools}
            </div>
          ) : null}
        </CardLegend>
        <Card style={{paddingBottom: 0}}>
          <CardContent style={contentStyle}>
            {this.props.children}
          </CardContent>
        </Card>
      </div>
    )
  }
}
