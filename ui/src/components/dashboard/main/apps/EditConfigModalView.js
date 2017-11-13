import React from 'react'
import {Form} from 'redux-form'
import {Modal, CardPanel, SubmitBlock} from 'components/modal/parts'

export default class EditConfigModalView extends React.Component {
  render () {
    const {onHide, onClickOK} = this.props
    return (
      <Modal title="Config" onRequestClose={onHide}>
        <CardPanel title="Config">

        </CardPanel>

        <SubmitBlock onSave={onClickOK}/>
      </Modal>
    )
  }
}
