import React from 'react'
import {Checkbox} from 'material-ui'

import SortableTree from 'react-sortable-tree'

export default class DeviceMonitorPicker extends React.Component {
  renderMonitor (monitor) {
    const {onClickToggleMonitor, selectedMonitors} = this.props
    const checked = selectedMonitors && selectedMonitors.includes(monitor.uid)
    return (
      <Checkbox
        label={monitor.name} onCheck={() => onClickToggleMonitor(monitor)}
        checked={checked}/>
    )
  }
  renderDevice (device) {
    const {onClickToggleDevice, selectedServers} = this.props
    const checked = selectedServers && selectedServers.includes(device.id)
    return (
      <Checkbox
        label={device.name} onCheck={() => onClickToggleDevice(device)}
        checked={checked}/>
    )
  }
  render () {
    const {allDevices, onChangeTreeData, monitorTreeData, monitorGroups} = this.props
    let data = monitorTreeData
    if (!data) {
      data = allDevices.map(device => ({
        title: this.renderDevice.bind(this, device),
        children: (device.monitors || []).map(monitor => ({
          title: this.renderMonitor.bind(this, monitor)
        }))
      }))

      monitorGroups.forEach(group => {
        // const children = []
        //
        // return {
        //   title: this.renderMonitorGroup.bind(this, group),
        //   children
        // }
      })
    }
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={data}
          onChange={onChangeTreeData}
          canDrag={false}
          rowHeight={50}
        />
      </div>
    )
  }
}
