import React from 'react'
import {Checkbox} from 'material-ui'
import SetDefIcon from 'material-ui/svg-icons/content/sort'
import {IconButton} from 'material-ui'

import SortableTree from 'react-sortable-tree'
import {Modal, CardPanel} from 'components/modal/parts'

export default class DeviceMonitorPicker extends React.Component {
  renderMonitor (monitor) {
    const {onClickAddMonitor, onClickRemoveMonitor, selectedMonitors} = this.props
    const checked = selectedMonitors && selectedMonitors.includes(monitor.uid).length > 0
    return (
      <Checkbox
        label={monitor.name} onCheck={() => checked ? onClickRemoveMonitor(monitor.uid) : onClickAddMonitor(monitor.uid)}
        checked={checked}/>
    )
  }
  renderDevice (device) {
    const {onClickDevice, selectedServers} = this.props
    return (
      <Checkbox
        label={device.name} onCheck={() => onClickDevice(device)}
        checked={selectedServers && selectedServers.filter(p => p.id === device.id).length > 0}/>
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
