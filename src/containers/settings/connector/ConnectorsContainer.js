import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Connectors from 'components/sidebar/settings/connector/Connectors'
import {
    fetchCollectors,
    showCollectorModal,
    addCollector,
    updateCollector,
    removeCollector,
    showUserConnectorModal,

    showAgentModal
} from 'actions'

class CollectorsContainer extends React.Component {
    render () {
        return (
            <Connectors {...this.props} />
        )
    }
}
export default connect(
    state => ({
        collectors: state.dashboard.collectors,
        collectorModalOpen: state.dashboard.collectorModalOpen,
        editCollector: state.dashboard.editCollector,
        preloaderOpen: state.dashboard.preloaderOpen,
        resolvedAddr: state.dashboard.resolvedAddr,

        userConnectorModalOpen: state.dashboard.userConnectorModalOpen,
        editUserConnector: state.dashboard.editUserConnector,

        agentModalOpen: state.dashboard.agentModalOpen,
        editAgent: state.dashboard.editAgent
    }), {
        fetchCollectors,
        showCollectorModal,
        addCollector,
        updateCollector,
        removeCollector,
        showUserConnectorModal,

        showAgentModal
    }
)(withRouter(CollectorsContainer))
