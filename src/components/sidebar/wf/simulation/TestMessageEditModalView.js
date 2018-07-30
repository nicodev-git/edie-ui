import React from 'react'
import {Field} from 'redux-form'

import {
  FormInput,
  Modal,
  SubmitBlock,
  CardPanel
} from 'components/modal/parts'

export default class TestMessageEditModalView extends React.Component {
  render () {
    const {onClickClose, onSubmit, msgType} = this.props
    return (
      <Modal title="Message" onRequestClose={onClickClose}>
        <form  onSubmit={onSubmit}>
          <CardPanel title={msgType.name}>
              {
                msgType.data.map(p =>
                  <Field
                    key={p.key}
                    name={`${p.key}`}
                    component={FormInput}
                    label={p.label}
                    className="valign-top margin-md-right"/>
                )
              }
          </CardPanel>
          <SubmitBlock name="OK"/>
        </form>
      </Modal>
    )
  }
}