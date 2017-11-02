import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import WfRectModalView from './WfRectModalView'

class WfRectModal extends React.Component {
  onSubmit (values) {

  }
  onHide () {

  }
  render () {
    const {handleSubmit} = this.props
    return (
      <WfRectModalView
        onHide={this.onHide.bind(this)}
        searchList={[]}
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

