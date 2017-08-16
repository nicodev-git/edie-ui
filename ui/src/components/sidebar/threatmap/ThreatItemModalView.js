import React from 'react'
import { CloseButton } from 'components/modal/parts'
import {renderEntity} from 'components/common/CellRenderers'

import {Modal} from 'components/modal/parts'

export default class ThreatItemModalView extends React.Component {
  render () {
    const {entity, onHide} = this.props
    return (
      <Modal title="Details" onRequestClose={onHide}>
        <div>
          {renderEntity(entity)}
        </div>
        <CloseButton onClose={onHide} />
      </Modal>
    )
  }
}
