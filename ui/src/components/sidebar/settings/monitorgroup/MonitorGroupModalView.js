import React from 'react'
import { Form, Field } from 'redux-form'
import {Checkbox} from '@material-ui/core'
import SortableTree from 'react-sortable-tree'
import { FormControlLabel } from '@material-ui/core'

import { Modal, CardPanel, FormInput, SubmitBlock } from 'components/modal/parts'

export default class MonitorGroupModalView extends React.Component {
  renderMonitor (monitor) {
    const {onClickMonitor, selectedMonitors} = this.props
    return (
      <FormControlLabel
        control={
          <Checkbox
            onChange={() => onClickMonitor(monitor)}
            checked={selectedMonitors && selectedMonitors.filter(p => p.uid === monitor.uid).length > 0}/>
        }
        label={monitor.name}
      />
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

  render () {
    const {onHide, onSubmit, title} = this.props
    return (
      <Modal title={title} onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel title="Monitor Group">
            <Field name="name" component={FormInput} floatingLabel="Name"/>

            {this.renderTree()}
          </CardPanel>

          <SubmitBlock name="Save"/>
        </Form>
      </Modal>
    )
  }
}
