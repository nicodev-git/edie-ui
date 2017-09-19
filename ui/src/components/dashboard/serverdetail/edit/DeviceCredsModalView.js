import React from 'react'
import { IconButton } from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'

import { Modal, CardPanel } from 'components/modal/parts'
import Credentials from 'components/common/wizard/input/Credentials'

export default class DeviceCredsModalView extends React.Component {
  renderButtons () {
    const {onClickAdd} = this.props
    return (
      <div>
        <IconButton onTouchTap={onClickAdd} tooltip="Add Credentials">
          <AddCircleIcon size={32}/>
        </IconButton>
      </div>
    )
  }
  render () {
    const {onHide, editDevice} = this.props
    return (
      <Modal title="Credentials" onRequestClose={onHide}>
        <CardPanel title="Credentials" tools={this.renderButtons()}>
          <Credentials
            {...this.props}
            selectedDevice={editDevice}
          />
        </CardPanel>
      </Modal>
    )
  }
}
