import React from 'react'
import Agents from 'components/sidebar/settings/agent/Agents'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  showAgentModal,
  addAgent,
  updateAgent,
  removeAgent,
  fetchAgents,

  installAgent
} from 'actions'

class AgentsContainer extends React.Component {
  render () {
    return (
      <Agents {...this.props} />
    )
  }
}
export default connect(
  state => ({
    agents: state.settings.agents,
    agentModalOpen:state.settings.agentModalOpen,
    editAgent: state.settings.editAgent,
    agentDraw: state.settings.agentDraw
  }), {
    showAgentModal,
    addAgent,
    updateAgent,
    removeAgent,
    fetchAgents,

    installAgent
  }
)(withRouter(AgentsContainer))
