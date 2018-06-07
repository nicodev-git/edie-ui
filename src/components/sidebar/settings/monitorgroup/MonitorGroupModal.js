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
        props.allDevices.every(device => {
          const found = (device.monitors || []).filter(p => p.uid === uid)
          if (found.length) selectedMonitors.push(found[0])
          return found.length === 0
        })
      })
    }

    this.state = {
      selectedMonitors,
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
    const {editMonitorGroup} = this.props
    const props = {
      ...editMonitorGroup,
      ...values,
      monitorids: this.state.selectedMonitors.map(p => p.uid)
    }

    if (editMonitorGroup) {
      this.props.updateMonitorGroup(props)
    } else {
      this.props.addMonitorGroup(props)
    }
    this.onHide()
  }
  render () {
    const {selectedMonitors} = this.state
    const {handleSubmit, allDevices, editMonitorGroup} = this.props
    return (
      <MonitorGroupModalView
        title={editMonitorGroup ? 'Edit Monitor Group' : 'Add Monitor Group'}
        onHide={this.onHide.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}

        allDevices={allDevices}
        selectedMonitors={selectedMonitors}
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
