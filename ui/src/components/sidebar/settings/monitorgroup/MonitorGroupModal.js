import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import MonitorGroupModalView from './MonitorGroupModalView'

class MonitorGroupModal extends React.Component {
  constructor (props) {
    super(props)
    const selectedMonitors = []
    if (props.editMonitorGroup) {
      (props.editMonitorGroup.monitorids || []).forEach(uid => {

      })
    }

    this.state = {
      selectedMonitors: [],
      monitorTreeData: null
    }
  }

  onClickMonitor (monitor) {
    let {selectedMonitors} = this.state
    if (selectedMonitors.filter(p => p.uid === monitor.uid).length) {
      selectedMonitors = selectedMonitors.filter(p => p.uid !== monitor.uid)
    } else {
      selectedMonitors = [...selectedMonitors, monitor]
    }
    this.setState({selectedMonitors})
  }

  onHide () {
    this.props.showMonitorGroupModal(false)
  }
  handleFormSubmit (values) {

  }
  render () {
    const {handleSubmit, allDevices, editMonitorGroup} = this.props
    return (
      <MonitorGroupModalView
        title={editMonitorGroup ? 'Edit Monitor Group' : 'Add Monitor Group'}
        onHide={this.onHide.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}

        allDevices={allDevices}
        onClickMonitor={this.onClickMonitor.bind(this)}

        monitorTreeData={this.state.monitorTreeData}
        onChangeTreeData={(monitorTreeData) => {this.setState({monitorTreeData})}}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: state.settings.editMonitorGroup
  })
)(reduxForm({form: 'monitorGroupEditForm'})(MonitorGroupModal))
