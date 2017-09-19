import React from 'react'

import { Modal, CardPanel } from 'components/modal/parts'
import Credentials from 'components/common/wizard/input/Credentials'

export default class DeviceCredsModalView extends React.Component {
  render () {
    const {onHide, editDevice} = this.props
    return (
      <Modal title="Credentials" onRequestClose={onHide}>
        <CardPanel title="Credentials">
          <Credentials
            {...this.props}
            selectedDevice={editDevice}
          />
        </CardPanel>
      </Modal>
    )
  }
}
