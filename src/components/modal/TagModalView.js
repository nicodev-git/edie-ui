import React from 'react'
import {Dialog} from 'material-ui'
import {Field} from 'redux-form'

import {FormInput, SubmitBlock} from './parts'

export default class TagModalView extends React.Component {
  render () {
    const {onClickClose, onSubmit} = this.props
    return (
      <Dialog open title="Tag">
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="name" component={FormInput} type="text" floatingLabel="Name"/>
            <Field name="desc" component={FormInput} type="text" floatingLabel="Description"/>
            <Field name="order" component={FormInput} type="text" floatingLabel="Order"/>
          </div>
          <SubmitBlock name="Save" onCancel={onClickClose}/>
        </form>
      </Dialog>
    )
  }
}
