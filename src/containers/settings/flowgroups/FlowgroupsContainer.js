import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Groups from 'components/page/group/groups'

import {
  fetchGroups,
  showGroupModal,
  addGroup,
  updateGroup,
  removeGroup
} from 'actions'

class GroupsContainer extends React.Component {
  render () {
    return (
      <Groups {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    groups: state.workflow.groups,
    groupModalOpen: state.workflow.groupModalOpen,
    editGroup: state.workflow.editGroup
  }), {
    fetchGroups,
    showGroupModal,
    addGroup,
    updateGroup,
    removeGroup
  }
)(withRouter(GroupsContainer))
