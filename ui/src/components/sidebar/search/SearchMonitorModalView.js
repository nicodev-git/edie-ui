import React from 'react'

import SortableTree from 'react-sortable-tree'

import {TwoButtonsBlockCustom, Modal, CardPanel} from 'components/modal/parts'

export default class SearchMonitorModalView extends React.Component {
  renderTitle (monitor) {
    const {onClickRow, selected} = this.props
    return (
      (
        <div
          className="link text-primary"
          onClick={() => onClickRow(monitor)}
          style={{background: selected && selected.filter(p => p.uid === monitor.uid).length ? '#888' : ''}}
        >
          {monitor.name}
        </div>
      )
    )
  }
  renderTree () {
    const {allDevices, onChangeTreeData, monitorTreeData, onClickRow, selected} = this.props
    let data = monitorTreeData
    if (!data) {
      data = allDevices.filter(p => p.monitors && p.monitors.length).map(device => ({
        title: device.name,
        children: device.monitors.map(monitor => ({
          title: this.renderTitle.bind(this, monitor)
        }))
      }))
    }
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={data}
          onChange={onChangeTreeData}
          canDrag={false}
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
    const {onClickOK, onClickClose, onClickShowAny} = this.props
    return (
      <Modal title="Monitors" onRequestClose={onClickClose}>
        <CardPanel title="Monitors">
          {this.renderTree()}
        </CardPanel>
        <TwoButtonsBlockCustom name1="Show Any" name2="OK" action1={onClickShowAny} action2={onClickOK}/>
      </Modal>
    )
  }
}
