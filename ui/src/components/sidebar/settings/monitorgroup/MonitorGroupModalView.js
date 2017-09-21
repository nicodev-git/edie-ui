import React from 'react'
import { Form, Field } from 'redux-form'
import {Checkbox} from 'material-ui'
import SortableTree from 'react-sortable-tree'

import { Modal, CardPanel, FormInput, SubmitBlock } from 'components/modal/parts'

export default class MonitorGroupModalView extends React.Component {
  renderMonitor (monitor) {
    const {onClickMonitor, selectedMonitors} = this.props
    return (
      <Checkbox
        label={monitor.name} onCheck={() => onClickMonitor(monitor)}
        checked={selectedMonitors && selectedMonitors.filter(p => p.uid === monitor.uid).length > 0}/>
    )
  }
  renderTree () {
    const {allDevices, onChangeTreeData, monitorTreeData} = this.props
    let data = monitorTreeData
    if (!data) {
      data = allDevices.filter(p => p.monitors && p.monitors.length).map(device => ({
        title: device.name,
        children: device.monitors.map(monitor => ({
          title: this.renderMonitor.bind(this, monitor)
        }))
      }))
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

  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Modal title="Monitor Group" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel title="Monitor Group">
            <Field name="name" component={FormInput} floatingLabel="Name"/>

            {this.renderTree()}
          </CardPanel>
        </Form>
      </Modal>
    )
  }
}
