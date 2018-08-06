import React from 'react'
import {Field} from 'redux-form'

import {
  FormInput,
  FormSelect,
  Modal,
  SubmitBlock,
  CardPanel
} from 'components/modal/parts'

export default class TestMessageEditModalView extends React.Component {
  renderField (field) {
    const {userConnectors} = this.props
    switch (field.type) {
      case 'connector':
        return (
          <Field
            key={field.key}
            name={`${field.key}`}
            component={FormSelect}
            floatingLabel={field.label}
            className="valign-top margin-md-right"
            options={userConnectors}
            fullWidth={!!field.fullWidth}
          />
        )
      default:
        return (
          <Field
            key={field.key}
            name={`${field.key}`}
            component={FormInput}
            floatingLabel={field.label}
            className="valign-top margin-md-right"
            multiline={field.type === 'multiline'}
            fullWidth={!!field.fullWidth}
          />
        )
    }
  }
  render () {
    const {onClickClose, onSubmit, msgType} = this.props
    return (
      <Modal title="Message" onRequestClose={onClickClose}>
        <form  onSubmit={onSubmit}>
          <CardPanel title={msgType.name}>
              {
                msgType.data.map(p => this.renderField(p))
              }
          </CardPanel>
          <SubmitBlock name="OK"/>
        </form>
      </Modal>
    )
  }
}