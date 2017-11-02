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
            <Field name="name" component={FormInput} label="Name" />
            <div>
              <Field name="goodId" label="Good" component={FormSelect} options={searchList} />
              <Field name="badId" label="Bad" component={FormSelect} options={searchList} className="margin-md-left"/>
            </div>
          </CardPanel>
          <SubmitBlock name="Add" onClick={onHide}/>
        </Form>
      </Modal>
    )
  }
}
