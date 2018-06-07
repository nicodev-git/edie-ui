import React from 'react'

import SearchMonitorModalView from './SearchMonitorModalView'
import { showAlert } from 'components/common/Alert'

export default class SearchMonitorModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedDevices: [],
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

  onClickDevice (device) {
    let {selectedDevices} = this.state
    if (selectedDevices.filter(p => p.id === device.id).length) {
      selectedDevices = selectedDevices.filter(p => p.id !== device.id)
    } else {
      selectedDevices = [...selectedDevices, device]
    }
    this.setState({selectedDevices})
  }

  onClickOK () {
    const {selectedMonitors, selectedDevices} = this.state
    if (!selectedMonitors.length && !selectedDevices.length) {
      showAlert('Please select device or monitor.')
      return
    }
    this.props.onClickOK(selectedMonitors, selectedDevices)
  }

  onClickClose () {
    this.props.showSearchMonitorModal(false)
  }

  onClickShowAny () {
    this.props.onClickOK([], [])
  }

  onClickMonitorGroups () {
    this.props.showMonitorGroupsModal(true)
  }

  render () {
    return (
      <SearchMonitorModalView
        monitorGroups={this.props.monitorGroups}
        allDevices={this.props.allDevices}
        selectedDevices={this.state.selectedDevices}
        selectedMonitors={this.state.selectedMonitors}
        onClickOK={this.onClickOK.bind(this)}
        onClickClose={this.onClickClose.bind(this)}
        onClickMonitor={this.onClickMonitor.bind(this)}
        onClickDevice={this.onClickDevice.bind(this)}
        onClickShowAny={this.onClickShowAny.bind(this)}
        onClickMonitorGroups={this.onClickMonitorGroups.bind(this)}

        monitorTreeData={this.state.monitorTreeData}
        onChangeTreeData={(monitorTreeData) => {this.setState({monitorTreeData})}}
      />
    )
  }
}
