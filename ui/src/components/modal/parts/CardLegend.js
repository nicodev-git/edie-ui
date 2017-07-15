import React from 'react'

export default class CardLegend extends React.Component {
  render () {
    return (
      <div className="margin-lg-top">{this.props.children}</div>
    )
  }
}
