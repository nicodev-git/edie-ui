import React from 'react'
import {Chip} from 'material-ui'

import {chipStyles} from 'style/materialStyles'

export default class Workflows extends React.Component {
  render () {
    return (
      <div className="margin-md-bottom" style={chipStyles.wrapper}>
        {this.props.editWorkflows.map((k, i) =>
          <Chip
            key={i}
            style={chipStyles.chip}
            onRequestDelete={this.onClickDeleteWf.bind(this, k)}>
            {k.name}
          </Chip>
        )}
      </div>
    )
  }
}
