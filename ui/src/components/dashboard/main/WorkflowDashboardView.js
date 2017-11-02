import React from 'react'
import {concat} from 'lodash'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'

import WfRectModal from './workflow/WfRectModal'

export default class WorkflowDashboardView extends React.Component {

  getUserSearchOptions () {
    const {userInfo} = this.props
    if (!userInfo) return []
    const {searchOptions} = userInfo
    if (!searchOptions) return []
    try {
      return JSON.parse(searchOptions)
    } catch (e) {
      console.log(e)
    }
    return []
  }

  getSearchList () {
    const {sysSearchOptions} = this.props
    return concat([], this.getUserSearchOptions().map(p => {
      return {
        ...p,
        type: 'User'
      }
    }), sysSearchOptions.map(p => {
      return {
        ...p,
        type: 'System'
      }
    }))
  }

  ////////////////////

  onClickAddItem () {
    this.props.showWfRectModal(true)
  }

  onCloseWfRectModal () {
    this.props.showWfRectModal(false)
  }

  ////////////////////

  renderWfRectModal () {
    if (!this.props.wfRectModalOpen) return null
    const searchList = this.getSearchList().map(p => ({
      label: p.name,
      value: p.id
    }))
    return (
      <WfRectModal
        searchList={searchList}
        onHide={this.onCloseWfRectModal.bind(this)}/>
    )
  }
  renderAddMenu () {
    return (
      <div className="text-right" style={{position: 'absolute', top: -45, right: 0}}>
        <IconButton onTouchTap={this.onClickAddItem.bind(this)}><AddCircleIcon /></IconButton>
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.renderAddMenu()}
        <ul className="web-applet-cards">
        </ul>
        {this.renderWfRectModal()}
      </div>
    )
  }
}
