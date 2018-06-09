import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Braincells from 'components/page/setting/braincell/Braincells'
import {
    fetchBrainCells,
    addBrainCell,
    updateBrainCell,
    removeBrainCell,
    showBrainCellModal,
    showScriptModal,
    showGrokModal,
    showCellParamModal,

    fetchWorkflows
} from 'actions'

class BraincellsContainer extends React.Component {
    render () {
        return (
            <Braincells {...this.props} />
        )
    }
}
export default connect(
    state => ({
        brainCells: state.settings.brainCells,
        brainCellModalOpen: state.settings.brainCellModalOpen,
        editBrainCell: state.settings.editBrainCell,
        scriptModalOpen: state.settings.scriptModalOpen,
        grokModalOpen: state.settings.grokModalOpen,
        editCellParam: state.settings.editCellParam,
        cellParamModalOpen: state.settings.cellParamModalOpen,

        workflows: state.workflow.workflows
    }), {
        fetchBrainCells,
        addBrainCell,
        updateBrainCell,
        removeBrainCell,
        showBrainCellModal,
        showScriptModal,
        showGrokModal,
        showCellParamModal,

        fetchWorkflows
    }
)(withRouter(BraincellsContainer))
