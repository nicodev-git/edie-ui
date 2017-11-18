import React from 'react'
import {Form} from 'redux-form'
import IconButton from 'material-ui/IconButton'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'

import { Modal, CardPanel, SubmitBlock } from 'components/modal/parts'
import AgentPicker from 'components/common/wizard/input/AgentPicker'
import Credentials from 'components/common/wizard/input/Credentials'
import DeviceCredsModal from './DeviceCredsModal'

export default class DeviceFixModalView extends React.Component {
  renderCredentials () {
    const {editDevice, config, onClickAddCreds, onReplaceCreds} = this.props
    if (!config.credentials) return null

    return (
      <CardPanel
        title="Credentials"
        tools={<IconButton onTouchTap={onClickAddCreds}><AddCircleIcon/></IconButton>}>
        <Credentials {...this.props} selectedDevice={editDevice} showGlobal
                     onReplaceCreds={onReplaceCreds}/>
      </CardPanel>
    )
  }

  renderAgentPick () {
    const {config, onChangeAgentType} = this.props
    if (!config.agentPick) return null
    return (
      <div className="margin-md-top">
        <AgentPicker {...this.props} onChange={onChangeAgentType}/>
      </div>
    )
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

  renderDistribution () {
    const {config} = this.props
    if (!config.distribution) return null
    return (
      <div>

      </div>
    )
  }

  render () {
    const {onHide, msg, onSubmit, modals} = this.props
    return (
      <Modal title="Fix" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel>
            {msg}
            {this.renderAgentPick()}
            {this.renderDistribution()}
          </CardPanel>

          {this.renderCredentials()}
          {this.renderDeviceCredsModal()}

          <SubmitBlock name="OK"/>
        </Form>
        {modals}
      </Modal>
    )
  }
}
