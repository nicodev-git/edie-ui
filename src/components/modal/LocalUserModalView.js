import React from 'react'
import {Dialog} from 'material-ui'
import {Field} from 'redux-form'

import {FormInput, SubmitBlock} from './parts'

export default class LocalUserModalView extends React.Component {
  render () {
    const {onClickClose, onSubmit} = this.props
    return (
      <Dialog open title="User" onRequestClose={onClickClose}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="username" component={FormInput} type="text" label="User"/>
            <Field name="userpassword" component={FormInput} type="password" label="Passowrd"/>
          </div>
          <SubmitBlock name="OK" onClick={onClickClose}/>
        </form>
      </Dialog>
    )
  }
}
