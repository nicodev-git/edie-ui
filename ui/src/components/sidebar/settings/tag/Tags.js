import React from 'react'
import {RaisedButton} from 'material-ui'

import InfiniteTable from 'components/common/InfiniteTable'
import {showConfirm, showAlert} from 'components/common/Alert'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import TagModal from './TagModal'
import WfTabs from '../rule/WorkflowTabs'

export default class Tags extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }

    this.columns = [{
      'displayName': 'Name',
      'columnName': 'name'
    }, {
      'displayName': 'Description',
      'columnName': 'desc'
    }, {
      'displayName': 'Order',
      'columnName': 'order'
    }]
  }
  table () {
    return this.refs.table
  }
  onRowDblClick (item) {
    this.props.showTagModal(true, item)
  }
  onAddTag () {
    this.props.showTagModal(true)
  }
  onEditTag () {
    const item = this.table().getSelected()
    if (!item) return showAlert('Please select tag.')

    this.props.showTagModal(true, item)
  }
  onDeleteTag () {
    const item = this.table().getSelected()
    if (!item) return showAlert('Please select tag.')
    showConfirm('Are you sure?', btn => {
      if (btn !== 'ok') return
      this.props.removeTag(item)
    })
  }
  renderTagModal () {
    if (!this.props.tagModalOpen) return null
    return (
      <TagModal {...this.props}/>
    )
  }
  render () {
    return (
      <TabPage>
        <TabPageHeader title="Tags">
          <div className="text-center margin-md-top">
            <div className="pull-right">
              <RaisedButton label="Add" onTouchTap={this.onAddTag.bind(this)}/>&nbsp;
              <RaisedButton label="Edit" onTouchTap={this.onEditTag.bind(this)}/>&nbsp;
              <RaisedButton label="Delete" onTouchTap={this.onDeleteTag.bind(this)}/>&nbsp;
              <WfTabs history={this.props.history}/>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={5} history={this.props.history} location={this.props.location}>
          <InfiniteTable
            url="/tag"
            params={{
              draw: this.props.tagDraw
            }}
            cells={this.columns}
            ref="table"
            rowMetadata={{'key': 'id'}}
            selectable
            onRowDblClick={this.onRowDblClick.bind(this)}
          />
          {this.renderTagModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
