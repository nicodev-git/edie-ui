import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import MonitorGroupModalView from './MonitorGroupModalView'

class MonitorGroupModal extends React.Component {
  constructor (props) {
    super(props)
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
    const {handleSubmit, allDevices} = this.props
    return (
      <MonitorGroupModalView
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
