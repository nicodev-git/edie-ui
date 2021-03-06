import React from 'react'
import {Button, IconButton} from '@material-ui/core'
import Share from '@material-ui/icons/Share'
import { assign } from 'lodash'

import InfiniteTable from 'components/common/InfiniteTable'
import { showAlert } from 'components/common/Alert'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import WorkflowModalContainer from 'containers/settings/rule/WorkflowModalContainer'

import WfTabs from './WorkflowTabs'
import {hasPermission} from 'shared/Permission'

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
        const {userInfo} = this.props
        const canEdit = hasPermission(userInfo, 'EditSettings')
        return p.rowData.origin === 'USER' && canEdit ? <IconButton onClick={() => this.onClickShare(p.rowData)}><Share/></IconButton> : null
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

  renderContent (canEdit) {
    return (
      <InfiniteTable
        cells={this.cells}
        ref="logicalRules"
        rowMetadata={{'key': 'id'}}
        selectable
        onRowDblClick={canEdit ? this.onEditWorkflow.bind(this) : null}

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
    if (!selected) return showAlert('Please select workflow.')
    this.props.openWorkflowModal(selected)
  }

  onRemoveWorkflow () {
    const selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please select workflow.')

    this.props.removeWorkflow(selected)
  }

  onCloneWorkflow () {
    const selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please select workflow.')
    this.props.addWorkflow({
        ...selected,
        id: null,
        origin: 'USER',
        uuid: null,
        version: selected.version + 1
    })
  }
  render () {
    const {userInfo} = this.props
    const canEdit = hasPermission(userInfo, 'EditSettings')
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div className="pull-right">
              {canEdit && <Button variant="raised" onClick={this.onAddWorkflow.bind(this)}>Add</Button>}&nbsp;
              {canEdit && <Button variant="raised" onClick={this.onEditWorkflow.bind(this)}>Edit</Button>}&nbsp;
              {canEdit && <Button variant="raised" onClick={this.onRemoveWorkflow.bind(this)}>Remove</Button>}&nbsp;
              {canEdit && <Button variant="raised" onClick={this.onCloneWorkflow.bind(this)}>Clone</Button>}&nbsp;
              <WfTabs history={this.props.history}/>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={5} history={this.props.history} location={this.props.location} transparent>
          {this.renderContent(canEdit)}
          {this.renderWorkflowModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
