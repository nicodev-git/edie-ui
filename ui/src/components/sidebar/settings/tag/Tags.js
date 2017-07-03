import React from 'react'
import {RaisedButton, Chip} from 'material-ui'

import {showConfirm, showAlert} from 'components/common/Alert'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import TagModal from './TagModal'
import WfTabs from '../rule/WorkflowTabs'

import {chipStyles} from 'style/common/materialStyles'

export default class Tags extends React.Component {
  componentWillMount () {
    this.props.fetchTags()
  }
  onRowDblClick (item) {
    this.props.showTagModal(true, item)
  }
  onAddTag () {
    this.props.showTagModal(true)
  }
  onEditTag (item) {
    this.props.showTagModal(true, item)
  }
  onDeleteTag (item) {
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
  renderTags () {
    const {tags} = this.props
    return (
      <div style={chipStyles.wrapper}>
        {tags.map(p =>
          <Chip
            key={p.id}
            style={chipStyles.chip}
            labelStyle={chipStyles.label}
            onTouchTap={this.onClickEditTag.bind(this, p)}
            onRequestDelete={this.onDeleteTag.bind(this, p)}
          >
            {p.name}
          </Chip>
        )}
      </div>
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
          {this.renderTags()}
          {this.renderTagModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
