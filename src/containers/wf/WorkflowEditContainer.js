import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import WorkflowEdit from 'components/dashboard/wf/WorkflowEdit'

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

class WorkflowEditContainer extends React.Component {
    render () {
        return (
            <WorkflowEdit {...this.props}/>
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

        brainCells: state.setting.brainCells
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
)(withRouter(WorkflowEditContainer))
