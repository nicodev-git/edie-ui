import React from 'react'
import {Chip} from '@material-ui/core'

import {
  Modal,
  CardPanel
} from 'components/modal/parts'

export default class BraincellTagPickerModal extends React.Component {
  render() {
    const {tags, onClose, onPick} = this.props
    return (
      <Modal title="Tags" onRequestClose={onClose}>
        <CardPanel title="Tags">
          {tags.map((t, i) =>
            <Chip key={i} label={t} onClick={() => onPick(t)} className="margin-sm"/>
          )}
        </CardPanel>
      </Modal>
    )

  }
}
