import React from 'react'
import { Form, Field } from 'redux-form'

import { FormInput, FormSelect } from 'components/modal/parts'

export default class WfRectModalView extends React.Component {
  render () {
    const {onSubmit, searchList} = this.props
    return (
      <Form onSubmit={onSubmit}>
        <Field name="name" component={FormInput} label="Name" />
        <Field name="goodId" label="Good" component={FormSelect} options={searchList} />
        <Field name="badId" label="Bad" component={FormSelect} options={searchList}/>
      </Form>
    )
  }
}
