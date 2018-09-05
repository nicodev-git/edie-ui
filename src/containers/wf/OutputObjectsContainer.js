import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import OutputObjects from 'components/sidebar/wf/outputObjects/OutputObjects'

import {
  fetchGroups,
  showGroupModal,
  addGroup,
  updateGroup,
  removeGroup
} from 'actions'

class OutputObjectsContainer extends React.Component {
  render () {
    return (
      <OutputObjects {...this.props}/>
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
)(withRouter(OutputObjectsContainer))
