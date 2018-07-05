import React from 'react'
import {Form} from 'redux-form'
import { Modal } from 'components/modal/parts'
import CardPanel from "../../../modal/parts/CardPanel";

export default class DeviceFlowsModalView extends React.Component {
  render () {
    const {onHide, workflows} = this.props
    return (
      <Modal title="Flows" onRequestClose={onHide}>
        <CardPanel title="Flows">

        </CardPanel>
      </Modal>
    )
  }
}
