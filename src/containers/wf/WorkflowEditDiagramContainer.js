import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import WorkflowEditDiagram from 'components/sidebar/wf/WorkflowEditDiagram'

import {
    fetchWorkflow,
    fetchWorkflowByName,
    openDeviceWfDiagramModal,
    closeDeviceWfDiagramModal,
    fetchWorkflows,
    selectWorkflow,
    showWfNameModal,
    fetchShapes,

    addFlowItem,
    updateFlowItem,
    removeFlowItem,
    addFlowLine,
    updateFlowLine,
    moveFlowItems,
    changeFlowItemFill,

    showWfRuleModal,
    showWfTaskModal,

    showWfMappingModal,
    updateWorkflow,

    fetchCollectors,
    fetchBrainCells
} from 'actions'

class WorkflowEditDiagramContainer extends React.Component {
    render () {
        return (
            <WorkflowEditDiagram {...this.props}/>
        )
    }
}
export default connect(
    state => ({
        wfDiagramModalOpen: state.workflow.wfDiagramModalOpen,

        workflows: state.workflow.workflows,
        diagrams: state.workflow.diagrams,
        selectedWorkflow: state.workflow.selectedWorkflow,

        shapes: state.workflow.shapes,

        wfTaskModalOpen: state.workflow.wfTaskModalOpen,
        wfRuleModalOpen: state.workflow.wfRuleModalOpen,

        wfNameModalOpen: state.workflow.wfNameModalOpen,
        wfMappingModalOpen: state.workflow.wfMappingModalOpen,

        brainCells: state.settings.brainCells
    }), {
        fetchWorkflow,
        fetchWorkflowByName,
        openDeviceWfDiagramModal,
        closeDeviceWfDiagramModal,
        fetchWorkflows,
        selectWorkflow,
        showWfNameModal,
        fetchShapes,

        addFlowItem,
        updateFlowItem,
        removeFlowItem,
        addFlowLine,
        updateFlowLine,
        moveFlowItems,
        changeFlowItemFill,

        showWfRuleModal,
        showWfTaskModal,

        showWfMappingModal,
        updateWorkflow,

        fetchCollectors,
        fetchBrainCells
    }
)(withRouter(WorkflowEditDiagramContainer))
