import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import {showAlert} from 'components/common/Alert'

import RangeAddModalView from './RangeAddModalView'

class RangeAddModal extends React.Component {
  onSubmit (values) {
    if (!values.from || !values.to) {
      showAlert('Please type range')
      return
    }

    console.log(values)
    this.props.scanRange(values.from, values.to)
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

