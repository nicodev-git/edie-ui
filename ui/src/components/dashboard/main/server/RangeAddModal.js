import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import RangeAddModalView from './RangeAddModalView'

class RangeAddModal extends React.Component {
  onSubmit (values) {

  }
  render () {
    const {onHide, handleSubmit} = this.props
    return (
      <RangeAddModalView
        onHide={onHide}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: {}
  })
)(reduxForm({form: 'rangeAddForm'})(RangeAddModal))

