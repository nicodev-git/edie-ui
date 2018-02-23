import React from 'react'
import {Checkbox} from 'material-ui'
import SetDefIcon from 'material-ui-icons/Sort'
import {IconButton} from 'material-ui'

import SortableTree from 'react-sortable-tree'

import {TwoButtonsBlockCustom, Modal, CardPanel} from 'components/modal/parts'

export default class SearchMonitorModalView extends React.Component {
  renderMonitor (monitor) {
    const {onClickMonitor, selectedMonitors} = this.props
    return (
      <Checkbox
        label={monitor.name} onCheck={() => onClickMonitor(monitor)}
        checked={selectedMonitors && selectedMonitors.filter(p => p.uid === monitor.uid).length > 0}/>
    )
  }
  renderDevice (device) {
    const {onClickDevice, selectedDevices} = this.props
    return (
      <Checkbox
        label={device.name} onCheck={() => onClickDevice(device)}
        checked={selectedDevices && selectedDevices.filter(p => p.id === device.id).length > 0}/>
    )
  }
  renderTree () {
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
      <div style={{ height: 600 }}>
        <SortableTree
          treeData={data}
          onChange={onChangeTreeData}
          canDrag={false}
          rowHeight={50}
        />
      </div>
    )
  }

  renderTable () {
    // return (
    //   <div style={{maxHeight: 400, overflow: 'auto'}}>
    //     <table className="table table-hover">
    //       <tbody>
    //       {allDevices.map(device => (device.monitors || []).map(monitor =>
    //         <tr
    //           key={monitor.uid}
    //           onClick={() => onClickRow(monitor)}
    //           className={selected && selected.filter(p => p.uid === monitor.uid).length ? 'selected' : ''}
    //         >
    //           <td>{`${device.name} - ${monitor.name}`}</td>
    //         </tr>
    //       ))}
    //       </tbody>
    //     </table>
    //   </div>
    // )
  }

  render () {
    const {onClickOK, onClickClose, onClickShowAny, onClickMonitorGroups} = this.props
    return (
      <Modal title="Devices, monitor groups and monitors" onRequestClose={onClickClose}>
        <CardPanel
          title="Devices, monitor groups and monitors"
          tools={<IconButton onClick={onClickMonitorGroups} tooltip="Monitor Groups"><SetDefIcon size={32}/></IconButton>}>
          {this.renderTree()}
        </CardPanel>
        <TwoButtonsBlockCustom name1="Show Any" name2="OK" action1={onClickShowAny} action2={onClickOK}/>
      </Modal>
    )
  }
}
