import React, {Component} from 'react'
import {Field} from 'redux-form'

import {
  FormInput,
  SubmitBlock,
  Modal,
  CardPanel
} from 'components/modal/parts'

export default class FlowGroupsModalView extends Component {
  render () {
    const {onSubmit, onClickClose} = this.props
    return (
      <Modal title="Group">
        <form onSubmit={onSubmit}>
          <CardPanel title="Group">
            <Field name="name" component={FormInput} floatingLabel="Name"/>
          </CardPanel>
          <SubmitBlock name="Save" onCancel={onClickClose}/>
        </form>
      </Modal>
    )
  }
}
