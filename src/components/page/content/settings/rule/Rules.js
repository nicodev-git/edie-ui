import React from 'react'
import {RaisedButton, IconButton} from 'material-ui'
import Share from 'material-ui/svg-icons/social/share'
import { assign } from 'lodash'

import InfiniteTable from 'components/shared/InfiniteTable'
import { showAlert } from '../../../../shared/Alert'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'
import WorkflowModalContainer from 'containers/page/content/settings/rule/WorkflowModalContainer'

import WfTabs from './WorkflowTabs'

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
      'displayName': 'Tags',
      'columnName': 'tags',
      'customComponent': p => {
        return <div>{(p.data || []).join(', ')}</div>
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
    this.props.fetchWorkflows()
  }
  componentWillUpdate (props) {
    const {shareWorkflowResult} = this.props
    if (props.shareWorkflowResult && shareWorkflowResult !== props.shareWorkflowResult) {
      if (props.shareWorkflowResult === 'OK') showAlert('Shared successfully!')
      else showAlert('Share failed!')
    }
  }

  onClickShare (item) {
    const props = assign({}, item)
    if (props.updated) delete props.updated
    this.props.shareWorkflow(props)
  }

  renderContent () {
    return (
      <InfiniteTable
        cells={this.cells}
        ref="logicalRules"
        rowMetadata={{'key': 'id'}}
        selectable
        onRowDblClick={this.onEditWorkflow.bind(this)}

        useExternal={false}
        data={this.props.workflows}
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
            <div className="pull-right">
              <RaisedButton label="Add" onTouchTap={this.onAddWorkflow.bind(this)}/>&nbsp;
              <RaisedButton label="Edit" onTouchTap={this.onEditWorkflow.bind(this)}/>&nbsp;
              <RaisedButton label="Remove" onTouchTap={this.onRemoveWorkflow.bind(this)}/>&nbsp;
              <WfTabs router={this.props.router}/>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={6}>
          {this.renderContent()}
          {this.renderWorkflowModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
