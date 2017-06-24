import React from 'react'
import {Chip, FlatButton} from 'material-ui'

import {chipStyles} from 'style/common/materialStyles'

export default class Workflows extends React.Component {
  render () {
    const {workflows, showWfSelectModal, onClickDeleteWf} = this.props
    return (
      <div>
        <div>
          <label className="margin-md-bottom"><b>Workflows</b></label>
          <div className="pull-right">
            <FlatButton label="Add" onTouchTap={() => showWfSelectModal(true)}/>
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
