import React, {Component} from 'react'
import {Field} from 'redux-form'

import {
  FormInput,
  SubmitBlock,
  Modal,
  CardPanel
} from 'components/modal/parts'

export default class ShapeEditModalView extends Component {
  render () {
    const {onSubmit, onClickClose} = this.props
    return (
      <Modal title="Shape">
        <form onSubmit={onSubmit}>
          <CardPanel title="Shape">
            <Field name="name" component={FormInput} floatingLabel="Name"/>
          </CardPanel>
          <SubmitBlock name="Save" onCancel={onClickClose}/>
        </form>
      </Modal>
    )
  }
}
