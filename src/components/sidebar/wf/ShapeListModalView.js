import React, {Component} from 'react'
import {
  FormInput,
  FormSelect,
  SubmitBlock,
  Modal,
  CardPanel
} from 'components/modal/parts'

export default class ShapeListModalView extends Component {
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
          <CardPanel title="Shape">

          </CardPanel>
      </Modal>
    )
  }
}