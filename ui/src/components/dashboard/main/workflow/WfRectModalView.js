import React from 'react'
import { Form, Field } from 'redux-form'

import { FormInput, FormSelect, SubmitBlock } from 'components/modal/parts'
import {Modal, CardPanel} from 'components/modal/parts'

const units = [{
  label: 'Minutes', value: 'm'
}, {
  label: 'Hours', value: 'h'
}, {
  label: 'Days', value: 'd'
}, {
  label: 'Months', value: 'M'
}]

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
            <div>
              <Field name="interval" floatingLabel="Interval" component={FormInput} className="valign-top" style={{width: 80}} />
              <Field name="intervalUnit" floatingLabel="Unit" component={FormSelect} options={units} className="valign-top margin-md-left" style={{width: 100}}/>
            </div>
          </CardPanel>
          <SubmitBlock name="Save" onClick={onHide}/>
        </Form>
      </Modal>
    )
  }
}
