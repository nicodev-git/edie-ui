import React, {Component} from 'react'
import {Field} from 'redux-form'
import {
  FormInput,
  FormSelect,
  SubmitBlock,
  Modal,
  CardPanel
} from 'components/modal/parts'

export default class ShapeModalView extends Component {
  handleFormSubmit (props) {
    this.props.onSave(props)
    this.props.onClose()
  }

  render() {
    const {
      onSubmit, onClose
    } = this.props

    return (
      <Modal title="Shape" onRequestClose={onClose} contentStyle={{width: 1000}}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Shape">
            <Field name="name" component={FormInput} floatingLabel="Name"/>
          </CardPanel>

          <SubmitBlock name="Save"/>
        </form>
      </Modal>
    )
  }
}