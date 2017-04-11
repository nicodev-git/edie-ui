import React from 'react'
import {
  ButtonGroup, Button
} from 'react-bootstrap'

import InfiniteTable from '../../../../../shared/InfiniteTable'
import MainTabs from '../MainTabs'
import TabPage from '../../../../../shared/TabPage'
import TabPageBody from '../../../../../shared/TabPageBody'
import TabPageHeader from '../../../../../shared/TabPageHeader'

import MainWorkflowModal from './MainWorkflowModal'
import SysWorkflowsModal from './SysWorkflowsModal'

export default class MainWorkflows extends React.Component {
  constructor (props) {
    super(props)

    const {device} = this.props

    this.state = {
      params: {
        id: device.workflowids || []
      }
    }

    this.cells = [{
      'displayName': 'Name',
      'columnName': 'name'
    }, {
      'displayName': 'Category',
      'columnName': 'category'
    }, {
      'displayName': 'Severity',
      'columnName': 'severity'
    }, {
      'displayName': 'Description',
      'columnName': 'desc'
    }]
  }

  onClickAdd () {
    this.props.openDeviceWorkflowModal()
  }

  onClickAddSys () {
    this.props.openSysWorkflowsModal()
  }

  onClickEdit () {
    const selected = this.getTable().getSelected()
    if (!selected) return window.alert('Please select workflow.')
    this.props.openDeviceWorkflowModal(selected, this.props.device)
  }

  onClickRemove () {
    const selected = this.getTable().getSelected()
    if (!selected) return window.alert('Please select workflow.')
    this.props.removeDeviceWorkflow(selected, this.props.device)
  }

  getTable () {
    return this.refs.table.refs.wrappedInstance
  }

  renderTable () {
    const { device, workflowListDraw } = this.props
    return (
      <InfiniteTable
        id="rule1"
        cells={this.cells}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable
        onRowDblClick={this.onClickEdit.bind(this)}

        url="/workflow/search/findById"
        params={{
          id: device.workflowids || [],
          draw: workflowListDraw
        }}
      />
    )
  }

  renderWorkflowModal () {
    if (!this.props.workflowModalOpen) return null
    return <MainWorkflowModal {...this.props} />
  }

  renderSysWorkflowsModal () {
    if (!this.props.sysWorkflowsModalOpen) return null
    return <SysWorkflowsModal {...this.props} />
  }

  render () {
    const {device} = this.props
    return (
      <TabPage>
        <TabPageHeader title={device.name}>
          <div className="text-center margin-md-top">
            <div className="pull-right">
              <ButtonGroup>

                <Button onClick={this.onClickAdd.bind(this)}>Add</Button>
                <Button onClick={this.onClickAddSys.bind(this)}>Add System Workflow</Button>
                <Button onClick={this.onClickEdit.bind(this)}>Edit</Button>
                <Button onClick={this.onClickRemove.bind(this)}>Remove</Button>

              </ButtonGroup>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={MainTabs(device.id)} tab={1}>
          {this.renderTable()}
          {this.renderWorkflowModal()}
          {this.renderSysWorkflowsModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
