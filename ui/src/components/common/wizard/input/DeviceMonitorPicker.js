import React from 'react'
import {Checkbox} from '@material-ui/core'
import {findIndex} from 'lodash'
import { FormControlLabel } from '@material-ui/core'

import SortableTree from 'react-sortable-tree'

export default class DeviceMonitorPicker extends React.Component {
  renderMonitor (monitor) {
    const {onClickToggleMonitor, selectedMonitors} = this.props
    const checked = selectedMonitors && selectedMonitors.includes(monitor.uid)
    return (
      <FormControlLabel
        control={
          <Checkbox onChange={() => onClickToggleMonitor(monitor)} checked={checked}/>
        }
        label={monitor.name}
      />
    )
  }
  renderDevice (device) {
    const {onClickToggleDevice, selectedServers} = this.props
    const checked = selectedServers && selectedServers.includes(device.id)
    return (
      <FormControlLabel
        control={
          <Checkbox onChange={() => onClickToggleDevice(device)} checked={checked}/>
        }
        label={device.name}
      />
    )
  }
  renderMonitorGroup (group) {
    const {onClickToggleMonitorGroup, selectedMonitorGroups, monitorGroups} = this.props
    const checked = selectedMonitorGroups && selectedMonitorGroups.filter(p => p.id === group.id).length > 0
    const index = findIndex(monitorGroups, {id: group.id})
    const name = index < 0 ? '' : monitorGroups[index].name
    return (
      <FormControlLabel
        control={
          <Checkbox onChange={() => onClickToggleMonitorGroup(group)} checked={checked}/>
        }
        label={`${name || 'No Name'} (Monitor Group)`}
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
