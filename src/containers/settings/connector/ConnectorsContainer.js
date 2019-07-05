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

class ConnectorsContainer extends React.Component {
    render () {
        return (
            <Connectors {...this.props} />
        )
    }
}
export default connect(
    state => ({
        collectors: state.settings.collectors,
        collectorModalOpen: state.settings.collectorModalOpen,
        editCollector: state.settings.editCollector,

        userConnectorModalOpen: state.settings.userConnectorModalOpen,
        editUserConnector: state.settings.editUserConnector
    }), {
        fetchCollectors,
        showCollectorModal,
        showAgentModal,
        addCollector,
        updateCollector,
        removeCollector,
        showUserConnectorModal
    }
)(withRouter(ConnectorsContainer))
