import React from 'react'
import { Form, Field } from 'redux-form'

import { FormInput, FormSelect, SubmitBlock } from 'components/modal/parts'
import {Modal, CardPanel} from 'components/modal/parts'

export default class WfRectModalView extends React.Component {
  render () {
    const {onSubmit, searchList, onHide} = this.props
    return (
      <Modal title="RECT" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel title="RECT">
            <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top" />
            <div>
              <Field name="goodId" floatingLabel="Good" component={FormSelect} options={searchList} className="valign-top" />
              <Field name="badId" floatingLabel="Bad" component={FormSelect} options={searchList} className="valign-top margin-md-left"/>
            </div>
          </CardPanel>
          <SubmitBlock name="Save" onClick={onHide}/>
        </Form>
      </Modal>
    )
  }
}
