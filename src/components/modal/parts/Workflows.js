import React from 'react'
import {Chip} from 'material-ui'

import {chipStyles} from 'style/materialStyles'

export default class Workflows extends React.Component {
  render () {
    const {workflows, showWfSelectModal, onClickDeleteWf} = this.props
    return (
      <div>
        <div>
          <label>Workflows</label>
          <div className="pull-left">
            <a href="javascript:;" onClick={() => showWfSelectModal(true)}>
              <i className="fa fa-plus-square"/>
            </a>
          </div>
        </div>
        <div className="margin-md-bottom" style={chipStyles.wrapper}>
          {workflows.map((k, i) =>
            <Chip
              key={i}
              style={chipStyles.chip}
              onRequestDelete={() => onClickDeleteWf(k)}>
              {k.name}
            </Chip>
          )}
        </div>
      </div>
    )
  }
}
