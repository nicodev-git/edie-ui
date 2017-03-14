import React from 'react'
import {
  ButtonGroup,
  Button
} from 'react-bootstrap'

import { ResponsiveInfiniteTable } from '../../../../shared/InfiniteTable'
import { showAlert } from '../../../../shared/Alert'

import SettingTabs from '../SettingTabs'
import TabPage from '../../../../shared/TabPage'
import TabPageBody from '../../../../shared/TabPageBody'
import TabPageHeader from '../../../../shared/TabPageHeader'
import WorkflowModalContainer from '../../../../../containers/page/content/settings/rule/WorkflowModalContainer'

export default class Rules extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }

    this.cells = [{
      'displayName': 'Name',
      'columnName': 'name'
    }, {
      'displayName': 'Description',
      'columnName': 'desc'
    }, {
      'displayName': 'Display Incident Description',
      'columnName': 'display_incident_desc'
    }, {
      'displayName': 'Origin',
      'columnName': 'origin',
      'customComponent': props => {
        return <span>{props.data === 'SYSTEM' ? 'system' : 'custom'}</span>
      }
    }, {
      'displayName': 'Version',
      'columnName': 'version'
    }]
  }
  componentWillMount () {
    this.props.selectWorkflowCategory('')
    this.props.fetchWorkflows()
    this.props.fetchWorkflowCategories()
  }

  renderContent () {
    const workflows = this.props.selectedWorkflowCategory ? this.props.workflows.filter(m => m.category === this.props.selectedWorkflowCategory) : this.props.workflows
    return (
      <ResponsiveInfiniteTable
        cells={this.cells}
        ref="logicalRules"
        rowMetadata={{'key': 'id'}}
        selectable
        onRowDblClick={this.onEditWorkflow.bind(this)}

        useExternal={false}
        data={workflows}
      />
    )
  }

  renderWorkflowModal () {
    if (!this.props.workflowModalVisible) return null
    return (
      <WorkflowModalContainer />
    )
  }

  getTable () {
    return this.refs.logicalRules.refs.wrappedInstance
  }

  onChangeCategory (e) {
    this.props.selectWorkflowCategory(e.target.value)
  }

  onAddWorkflow () {
    this.props.openWorkflowModal()
  }

  onEditWorkflow () {
    const selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please select map.')
    this.props.openWorkflowModal(selected)
  }

  onRemoveWorkflow () {
    const selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please select map.')

    this.props.removeWorkflow(selected)
  }
  render () {
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div className="pull-left form-inline">
              <select className="form-control" value={this.props.selectedWorkflowCategory} onChange={this.onChangeCategory.bind(this)}>
                <option value="">All</option>
                {this.props.workflowCategories.map(m =>
                  <option key={m.id}>{m.name}</option>
                )}
              </select>
            </div>
            <div className="pull-right">
              <ButtonGroup>

                <Button onClick={this.onAddWorkflow.bind(this)}>Add</Button>
                <Button onClick={this.onEditWorkflow.bind(this)}>Edit</Button>
                <Button onClick={this.onRemoveWorkflow.bind(this)}>Remove</Button>
              </ButtonGroup>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={2}>
          {this.renderContent()}
          {this.renderWorkflowModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
