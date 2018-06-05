import React from 'react'
import {Chip} from '@material-ui/core'

import {chipStyles} from 'style/common/materialStyles'

export default class Workflows extends React.Component {
  render () {
    const {workflows, showWfSelectModal, onClickDeleteWf} = this.props
    return (
      <div>
        <div style={chipStyles.wrapper}>
          {showWfSelectModal && <Chip style={chipStyles.chip} onClick={() => showWfSelectModal(true)} label={<b>+</b>}/>}
          {workflows.map((k, i) =>
            <Chip
              key={i}
              style={chipStyles.chip}
              onDelete={onClickDeleteWf ? () => onClickDeleteWf(k) : null}
              label={k.name}
            />
          )}
        </div>
      </div>
    )
  }
}
