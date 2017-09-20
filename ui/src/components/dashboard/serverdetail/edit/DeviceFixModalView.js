import React from 'react'
import {Form} from 'redux-form'

import { Modal, CardPanel } from 'components/modal/parts'

export default class DeviceFixModalView extends React.Component {
  renderCredentials () {
    const {editDevice, fixCode} = this.props
    if (fixCode !== 1) return null
    return (
      <CardPanel title="Credentials" tools={<IconButton><AddCircleIcon/></IconButton>}>
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

  render () {
    const {onHide, msg, onSubmit} = this.props
    return (
      <Modal title="Fix" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel>
            {msg}
            {this.renderAgentPick()}
          </CardPanel>

          {this.renderCredentials()}
        </Form>
      </Modal>
    )
  }
}
