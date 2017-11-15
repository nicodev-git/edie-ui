import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import ServerSearchModalView from './ServerSearchModalView'

class ServerSearchModal extends React.Component {
  onSubmit (values) {
    values.diskEnabled = !!values.diskEnabled
    values.ipEnabled = !!values.ipEnabled
    values.memoryEnabled = !!values.memoryEnabled
    this.props.onSubmit(values)
  }
  render () {
    const {onHide, handleSubmit, onClickClear} = this.props
    return (
      <ServerSearchModalView
        onHide={onHide}
        onClickClear={onClickClear}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: state.dashboard.serverSearchParams
  })
)(reduxForm({form: 'serverSearchForm'})(ServerSearchModal))
