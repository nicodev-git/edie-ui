import React from 'react'
import {Dialog} from 'material-ui'
import { CloseButton } from 'components/modal/parts'
import {renderEntity} from 'components/common/CellRenderers'

export default class ThreatItemModalView extends React.Component {
  render () {
    const {entity, onHide} = this.props
    return (
      <Dialog open title="Details" onRequestClose={onHide}>
        <div>
          {renderEntity(entity)}
        </div>
        <CloseButton onClose={onHide} />
      </Dialog>
    )
  }
}
