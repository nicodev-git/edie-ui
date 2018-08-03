import React from 'react'
import Products from 'components/sidebar/settings/product/Products'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  showAgentModal,
  addAgent,
  updateAgent,
  removeAgent,
  fetchAgents,

  fetchCollectors,

  installAgent,
  clearAgentInstall,
  showAgentPreloader
} from 'actions'

class ProductsContainer extends React.Component {
  render () {
    return (
      <Products {...this.props} />
    )
  }
}
export default connect(
  state => ({
    agents: state.settings.agents,
    agentModalOpen:state.settings.agentModalOpen,
    editAgent: state.settings.editAgent,
    agentDraw: state.settings.agentDraw,

    agentPreloader: state.settings.agentPreloader,

    installAgents: state.settings.installAgents,

    collectors: state.settings.collectors
  }), {
    showAgentModal,
    addAgent,
    updateAgent,
    removeAgent,
    fetchAgents,

    fetchCollectors,

    installAgent,
    clearAgentInstall,
    showAgentPreloader
  }
)(withRouter(ProductsContainer))
