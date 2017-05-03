import React from 'react'
import {RaisedButton, MenuItem, SelectField, IconButton} from 'material-ui'
import Share from 'material-ui/svg-icons/social/share'

import InfiniteTable from 'components/shared/InfiniteTable'
import { showAlert } from '../../../../shared/Alert'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'
import WorkflowModalContainer from 'containers/page/content/settings/rule/WorkflowModalContainer'
import { errorStyle, underlineFocusStyle, inputStyle, selectedItemStyle } from 'style/materialStyles'

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
      'columnName': 'display_incident_desc',
      'cssClassName': 'width-300'
    }, {
      'displayName': 'Origin',
      'columnName': 'origin'
    }, {
      'displayName': 'Version',
      'columnName': 'version'
    }, {
      'displayName': 'Global',
      'columnName': 'isglobal',
      'customComponent': p => {
        return <span>{p.data ? 'YES' : 'NO'}</span>
      }
    }, {
      'displayName': '',
      'columnName': 'id',
      'cssClassName': 'width-80',
      'customComponent': p => {
        return p.rowData.origin === 'USER' ? <IconButton onTouchTap={() => this.onClickShare(p.rowData)}><Share/></IconButton> : null
      }
    }]
  }
  componentWillMount () {
    this.props.selectWorkflowCategory('')
    this.props.fetchWorkflows()
    this.props.fetchWorkflowCategories()
  }

  onClickShare (item) {
    console.log(item)
  }

  renderContent () {
    const workflows = this.props.selectedWorkflowCategory ? this.props.workflows.filter(m => m.category === this.props.selectedWorkflowCategory) : this.props.workflows
    return (
      <InfiniteTable
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
    return this.refs.logicalRules
  }

  onChangeCategory (e, index, value) {
    console.log(arguments)
    this.props.selectWorkflowCategory(value)
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
            <div className="pull-left form-inline text-left">
              <SelectField
                errorStyle={errorStyle}
                underlineStyle={underlineFocusStyle}
                selectedMenuItemStyle={selectedItemStyle}
                menuItemStyle={inputStyle}
                labelStyle={inputStyle}
                onChange={this.onChangeCategory.bind(this)}
                value={this.props.selectedWorkflowCategory}>
                <MenuItem value="" primaryText="All"/>
                {this.props.workflowCategories.map(m =>
                  <MenuItem key={m.id} value={m.id} primaryText={m.name}/>
                )}
              </SelectField>
            </div>
            <div className="pull-right">
              <RaisedButton label="Add" onTouchTap={this.onAddWorkflow.bind(this)}/>&nbsp;
              <RaisedButton label="Edit" onTouchTap={this.onEditWorkflow.bind(this)}/>&nbsp;
              <RaisedButton label="Remove" onTouchTap={this.onRemoveWorkflow.bind(this)}/>&nbsp;
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
