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
            <Field name="title" component={FormInput} floatingLabel="Name" className="margin-md-right"/>
            <Field name="description" component={FormInput} floatingLabel="Description" fullWidth/>

            <Field name="script" component={FormInput} floatingLabel="Script" fullWidth multiline style={{maxHeight: 200}}/>
          </CardPanel>
          <SubmitBlock name="Save" onCancel={onClickClose}/>
        </form>
      </Modal>
    )
  }
}
