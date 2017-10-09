import React from 'react'
import {Checkbox} from 'material-ui'
import {findIndex} from 'lodash'

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
        checked={checked}
        labelStyle={{color: 'green'}}
      />
    )
  }
  renderMonitorGroup (group) {
    const {onClickToggleMonitorGroup, selectedMonitorGroups, monitorGroups} = this.props
    const checked = selectedMonitorGroups && selectedMonitorGroups.filter(p => p.id === group.id).length > 0
    const index = findIndex(monitorGroups, {id: group.id})
    const name = index < 0 ? '' : monitorGroups[index].name
    return (
      <Checkbox
        label={`${name || 'No Name'} (Monitor Group)`} onCheck={() => onClickToggleMonitorGroup(group)}
        checked={checked}
        labelStyle={{color: 'blue'}}
      />
    )
  }
  render () {
    const {allDevices, onChangeTreeData, monitorTreeData, monitorGroups, selectedMonitors} = this.props
    let data = monitorTreeData
    if (!data) {
      data = allDevices.map(device => {
        const monitors = device.monitors || []
        const expanded = selectedMonitors ?
          monitors.filter(p => selectedMonitors.includes(p.uid)).length > 0 : false
        return {
          title: this.renderDevice.bind(this, device),
          expanded,
          children: monitors.map(monitor => ({
            title: this.renderMonitor.bind(this, monitor)
          }))
        }
      })

      monitorGroups.forEach(group => {
        const children = []
        data.push({
          title: this.renderMonitorGroup.bind(this, group),
          children
        })
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
