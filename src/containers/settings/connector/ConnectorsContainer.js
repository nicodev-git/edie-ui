import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Collectors from 'components/sidebar/setting/connector/Connectors'
import {
    fetchCollectors,
    showCollectorModal,
    addCollector,
    updateCollector,
    removeCollector,
    testConnector,
    showUserConnectorModal,

    showPreloader,

    showAgentModal
} from 'actions'

class CollectorsContainer extends React.Component {
    render () {
        return (
            <Collectors {...this.props} />
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
        editAgent: state.dashboard.editAgent,

        testConnectorStatus: state.dashboard.testConnectorStatus,
        testConnectorResult: state.dashboard.testConnectorResult
    }), {
        fetchCollectors,
        showCollectorModal,
        addCollector,
        updateCollector,
        removeCollector,
        testConnector,
        showUserConnectorModal,

        showPreloader,

        showAgentModal
    }
)(withRouter(CollectorsContainer))
