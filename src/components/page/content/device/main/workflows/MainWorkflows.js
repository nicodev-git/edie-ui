import React from 'react'
import {RaisedButton} from 'material-ui'

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
    }, {
      'displayName': 'Description',
      'columnName': 'desc'
    }, {
      'displayName': 'Global',
      'columnName': 'isglobal',
      'customComponent': p => {
        return <span>{p.data ? 'YES' : 'NO'}</span>
      }
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
    return this.refs.table
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
              <RaisedButton onTouchTap={this.onClickAdd.bind(this)} label="Add"/>&nbsp;
              <RaisedButton onTouchTap={this.onClickAddSys.bind(this)} label="Add System Workflow"/>&nbsp;
              <RaisedButton onTouchTap={this.onClickEdit.bind(this)} label="Edit"/>&nbsp;
              <RaisedButton onTouchTap={this.onClickRemove.bind(this)} label="Remove"/>
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
