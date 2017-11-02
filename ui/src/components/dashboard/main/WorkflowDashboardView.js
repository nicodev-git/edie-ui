import React from 'react'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'

import WfRectModal from './workflow/WfRectModal'

export default class WorkflowDashboardView extends React.Component {
  onClickAddItem () {
    this.props.showWfRectModal(true)
  }

  renderWfRectModal () {
    if (!this.props.wfRectModalOpen) return null
    return (
      <WfRectModal/>
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
