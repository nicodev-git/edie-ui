import React from 'react'
import {Dialog} from 'material-ui'
import {Field} from 'redux-form'

import {FormInput, SubmitBlock} from 'components/modal/parts'

export default class LocalUserModalView extends React.Component {
  render () {
    const {onClickClose, onSubmit} = this.props
    return (
      <Dialog open title="User" onRequestClose={onClickClose} contentStyle={{width: '600px'}}>
        <form onSubmit={onSubmit}>
          <div>
            <Field name="username" component={FormInput} type="text" label="User" className="margin-lg-right"/>
            <Field name="userpassword" component={FormInput} type="password" label="Password"/>
          </div>
          <SubmitBlock name="OK" onClick={onClickClose}/>
        </form>
      </Dialog>
    )
  }
}
