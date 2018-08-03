import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import FlowGroups from 'components/sidebar/settings/flowgroups/FlowGroups'

import {
  fetchGroups,
  showGroupModal,
  addGroup,
  updateGroup,
  removeGroup
} from 'actions'

class FlowGroupsContainer extends React.Component {
  render () {
    return (
      <FlowGroups {...this.props}/>
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
)(withRouter(FlowGroupsContainer))
