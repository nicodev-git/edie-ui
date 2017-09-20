import React from 'react'
import {Form} from 'redux-form'
import IconButton from 'material-ui/IconButton'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'

import { Modal, CardPanel } from 'components/modal/parts'
import AgentPicker from 'components/common/wizard/input/AgentPicker'
import Credentials from 'components/common/wizard/input/Credentials'
import DeviceCredsModal from './DeviceCredsModal'

export default class DeviceFixModalView extends React.Component {
  renderCredentials () {
    const {editDevice, fixCode, onClickAddCreds} = this.props
    if (fixCode !== 1) return null
    return (
      <CardPanel title="Credentials" tools={<IconButton onTouchTap={onClickAddCreds}><AddCircleIcon/></IconButton>}>
        <Credentials {...this.props} selectedDevice={editDevice}/>
      </CardPanel>
    )
  }
  renderAgentPick () {
    const {fixCode} = this.props
    switch (fixCode) {
      case 1:
        return (
          <div className="margin-md-top">
            <AgentPicker {...this.props}/>
          </div>
        )
      default:
        return null
    }
  }

  renderDeviceCredsModal () {
    const {deviceCredsModalOpen} = this.props
    if (!deviceCredsModalOpen) return null
    return (
      <DeviceCredsModal
        {...this.props}
      />
    )
  }

  render () {
    const {onHide, msg, onSubmit} = this.props
    return (
      <Modal title="Fix" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel>
            <span style={{color: '#600000'}}>{msg}</span>
            {this.renderAgentPick()}
          </CardPanel>

          {this.renderCredentials()}
          {this.renderDeviceCredsModal()}
        </Form>
      </Modal>
    )
  }
}
