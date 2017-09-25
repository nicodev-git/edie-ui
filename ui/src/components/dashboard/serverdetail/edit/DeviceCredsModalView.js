import React from 'react'
import { IconButton } from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'

import { Modal } from 'components/modal/parts'
import CredPicker from 'components/common/wizard/input/CredPicker'

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
    const {onHide, deviceCredentials, deviceGlobalCredentials} = this.props
    return (
      <Modal title="Credentials" onRequestClose={onHide}>
        <CredPicker
          {...this.props}
          deviceCredentials={deviceCredentials}
          deviceGlobalCredentials={deviceGlobalCredentials}
        />
      </Modal>
    )
  }
}
