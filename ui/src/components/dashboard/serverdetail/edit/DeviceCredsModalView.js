import React from 'react'

import { Modal, CardPanel } from 'components/modal/parts'
import Credentials from 'components/common/wizard/input/Credentials'
import CardPanel from "../../../modal/parts/CardPanel";

export default class DeviceCredsModalView extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <Modal title="Credentials" onRequestClose={onHide}>
        <CardPanel title="Credentials">
          <Credentials {...this.props}/>
        </CardPanel>
      </Modal>
    )
  }
}
