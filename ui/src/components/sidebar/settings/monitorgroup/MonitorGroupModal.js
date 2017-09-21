import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import MonitorGroupModalView from './MonitorGroupModalView'

class MonitorGroupModal extends React.Component {
  onHide () {
    this.props.showMonitorGroupModal(false)
  }
  render () {
    return (
      <MonitorGroupModalView
        onHide={this.onHide.bind(this)}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: state.settings.editMonitorGroup
  })
)(reduxForm({form: 'monitorGroupEditForm'})(MonitorGroupModal))
