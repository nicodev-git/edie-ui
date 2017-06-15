import React from 'react'
import {Dialog} from 'material-ui'
import { CloseButton } from 'components/modal/parts'
import {renderEntity} from 'components/shared/CellRenderers'

export default class ThreatItemModalView extends React.Component {
  render () {
    const {entity, onHide} = this.props
    return (
      <Dialog open title="Details">
        <div>
          {renderEntity(entity)}
        </div>
        <CloseButton onClose={onHide} />
      </Dialog>
    )
  }
}
