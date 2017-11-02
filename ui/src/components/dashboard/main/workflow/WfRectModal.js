import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import WfRectModalView from './WfRectModalView'

class WfRectModal extends React.Component {
  onSubmit (values) {

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

