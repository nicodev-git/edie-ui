import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import {LocalUserModalView} from 'components/modal'

@connect(
  state => ({
    initialValues: {}
  })
)
@reduxForm({form: 'localUserForm'})
export default class LocalUserModal extends React.Component {
  onSubmit (values) {
    console.log(values)
  }
  onClickClose () {
    this.props.showLocalUserModal(false)
  }
  render () {
    const {handleSubmit} = this.props
    return (
      <LocalUserModalView
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        onClickClose={this.onClickClose.bind(this)}
      />
    )
  }
}
