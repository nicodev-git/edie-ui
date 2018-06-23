import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import WorkflowEdit from 'components/dashboard/wf/WorkflowEdit'

import {
    openDeviceWfDiagramModal,
    closeDeviceWfDiagramModal,
    fetchWorkflows,
    selectWorkflow,
    showWfNameModal,
    addWorkflow,
    updateWorkflow,
    removeWorkflow,
    fetchWorkflowByName,

    fetchGroups,
    fetchDevices,

    addFlowItem,
    updateFlowItem,
    updateFlowItems,
    removeFlowItem,
    addFlowLine,
    updateFlowLine,
    moveFlowItems,
    changeFlowItemFill,

    showWfRuleModal,
    showWfTaskModal,

    showUserPickModal,

    fetchShapes,

    showWfSettingModal,
    fetchWfSetting,
    saveWfSetting,

    addBrainCell,
    fetchBrainCells,
    resetForm
} from 'actions'

class WorkflowsContainer extends React.Component {
    render () {
        return (
            <WorkflowEdit {...this.props}/>
        )
    }
}
export default connect(
    state => ({
        devices: state.devices.devices,
        wfDiagramModalOpen: state.workflow.wfDiagramModalOpen,

        workflows: state.workflow.workflows,
        diagrams: state.workflow.diagrams,
        selectedWorkflow: state.workflow.selectedWorkflow,

        wfTaskModalOpen: state.workflow.wfTaskModalOpen,
        wfRuleModalOpen: state.workflow.wfRuleModalOpen,

        wfNameModalOpen: state.workflow.wfNameModalOpen,

        groups: state.workflow.groups,

        users: state.dashboard.users,
        userPickModalOpen: state.workflow.userPickModalOpen,

        userInfo: state.dashboard.userInfo,

        shapes: state.workflow.shapes,

        wfSettingModalOpen: state.workflow.wfSettingModalOpen,
        editWfSetting: state.workflow.editWfSetting,

        brainCells: state.settings.brainCells
    }), {
        openDeviceWfDiagramModal,
        closeDeviceWfDiagramModal,
        fetchWorkflows,
        selectWorkflow,
        showWfNameModal,
        addWorkflow,
        updateWorkflow,
        removeWorkflow,
        fetchWorkflowByName,

        fetchGroups,
        fetchDevices,

        addFlowItem,
        updateFlowItem,
        updateFlowItems,
        removeFlowItem,
        addFlowLine,
        updateFlowLine,
        moveFlowItems,
        changeFlowItemFill,

        showWfRuleModal,
        showWfTaskModal,

        showUserPickModal,

        fetchShapes,

        showWfSettingModal,
        fetchWfSetting,
        saveWfSetting,

        addBrainCell,
        fetchBrainCells,
        resetForm
    }
)(withRouter(WorkflowsContainer))
