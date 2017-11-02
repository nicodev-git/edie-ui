import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import WfRectModalView from './WfRectModalView'

import {showAlert} from 'components/common/Alert'

class WfRectModal extends React.Component {
  onSubmit (values) {
    if (!values.name) {
      return showAlert('Please type name.')
    }
    this.props.onSubmit(values)
    this.props.onHide()
  }
  render () {
    const {handleSubmit, searchList, onHide} = this.props
    return (
      <WfRectModalView
        onHide={onHide}
        searchList={searchList}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}/>
    )
  }
}

const WfRectModalForm = reduxForm({form: 'wfRectForm'})(WfRectModal)

export default connect(
  state => ({
    initialValues: {
    }
  })
)(WfRectModalForm)

