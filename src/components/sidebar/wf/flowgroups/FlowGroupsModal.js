import React, {Component} from 'react'
import {Button} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import FlowGroupModal from './FlowGroupModal'

import FlowGroupsModalView from './FlowGroupsModalView'

export default class FlowGroupsModal extends Component {

  componentWillMount () {
    this.props.fetchGroups()
  }

  onHide () {
    this.props.onClose()
  }

  render () {
    return (
      <FlowGroupsModalView
        onClickClose={this.onHide.bind(this)}
      />
    )
  }
}
