import {
  OPEN_DEVICE_WF_DIAGRAM_MODAL,
  CLOSE_DEVICE_WF_DIAGRAM_MODAL,

  FETCH_WORKFLOWS,
  SELECT_WORKFLOW,
  ADD_WORKFLOW,
  REMOVE_WORKFLOW,

  SHOW_WF_TASK_MODAL,
  SHOW_WF_RULE_MODAL,

  UPDATE_WORKFLOW,
  SHOW_WORKFLOW_NAME_MODAL,
  UPDATE_WORKFLOW_SAVE_STATE,

  FETCH_PROGRESS_WFS,
  SHOW_WF_MAPPNIG_MODAL,

  FETCH_FINISHED_WFS,

  FETCH_GROUPS,
  SHOW_GROUP_MODAL,
  ADD_GROUP,
  UPDATE_GROUP,
  REMOVE_GROUP,

  FETCH_GLOBAL_VARS,

  FETCH_SHAPES,

  SHOW_USER_PICK_MODAL,
  SHOW_WF_SETTING_MODAL,

  SHOW_WF_SIMULATION_MODAL,
  FETCH_SIM_SAMPLES,
  ADD_SIM_SAMPLE,
  REMOVE_SIM_SAMPLE
} from 'actions/types'
import {UPDATE_WF_SIM_RES} from "../actions/types";

const initialState = {
  workflows: [],
  wfDiagramModalOpen: false,
  workflowOutput: [],
  progressWfs: [],
  groups: [],
  wfGroups: [],
  selectedWorkflow: '',
  finishedWfs: [],
  globalVars: [],
  shapes: [],
  simSamples: []
}
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_WORKFLOWS:
      return {
        ...state,
        workflows: action.data || [],
        diagrams: action.diagrams/*, selectedWorkflow: action.data.length ? action.data[0] : ''*/
      }
    case OPEN_DEVICE_WF_DIAGRAM_MODAL:
      return {...state, wfDiagramModalOpen: true, selectedWorkflow: action.flow}
    case CLOSE_DEVICE_WF_DIAGRAM_MODAL:
      return {...state, wfDiagramModalOpen: false}
    case SELECT_WORKFLOW:
      return {...state, selectedWorkflow: action.workflow}
    case SHOW_WF_TASK_MODAL:
      return {...state, wfTaskModalOpen: !!action.visible}
    case SHOW_WF_RULE_MODAL:
      return {...state, wfRuleModalOpen: !!action.visible}
    case SHOW_WORKFLOW_NAME_MODAL:
      return {...state, wfNameModalOpen: !!action.visible}
    case ADD_WORKFLOW:
      return {...state, workflows: [...state.workflows, action.data]}
    case UPDATE_WORKFLOW: {
      let {selectedWorkflow} = state
      if (action.data.uuid === selectedWorkflow.uuid) selectedWorkflow = action.data
      return {
        ...state,
        workflows: state.workflows.map(p => p.uuid === action.data.uuid ? action.data : p),
        selectedWorkflow
      }
    }

    case REMOVE_WORKFLOW:
      return {...state, workflows: state.workflows.filter(p => p.uuid !== action.data.uuid)}

    case UPDATE_WORKFLOW_SAVE_STATE:
      return {...state, workflowSaving: action.data}

    case FETCH_PROGRESS_WFS:
      return {...state, progressWfs: action.data}

    case SHOW_WF_MAPPNIG_MODAL:
      return {...state, wfMappingModalOpen: action.visible}

    case FETCH_GROUPS:
      return {...state, groups: action.data}
    case SHOW_GROUP_MODAL:
      return {...state, groupModalOpen: action.visible, editGroup: action.group}

    case ADD_GROUP:
      return {...state, groups: [...state.groups, action.data]}
    case UPDATE_GROUP:
      return {...state, groups: state.groups.map(p => p.id === action.data.id ? action.data : p)}
    case REMOVE_GROUP:
      return {...state, groups: state.groups.filter(p => p.id !== action.data.id)}

    case FETCH_FINISHED_WFS:
      return {...state, finishedWfs: action.data}

    case FETCH_GLOBAL_VARS:
      return {...state, globalVars: action.data}

    case SHOW_USER_PICK_MODAL:
      return {...state, userPickModalOpen: action.visible}

    case FETCH_SHAPES:
      return {...state, shapes: action.data}

    case SHOW_WF_SETTING_MODAL:
      return {...state, wfSettingModalOpen: action.visible, editWfSetting: action.data}

    case SHOW_WF_SIMULATION_MODAL:
      return {...state, wfSimulationModalOpen: action.visible}
    case UPDATE_WF_SIM_RES:
      return {...state, wfSimulationRes: action.data}

    case FETCH_SIM_SAMPLES:
      return { ...state, simSamples: action.data }
    case ADD_SIM_SAMPLE:
      return { ...state, simSamples: [...state.simSamples, action.data]}
    case REMOVE_SIM_SAMPLE:
      return { ...state, simSamples: state.simSamples.filter(p => p.id !== action.data.id) }
    default:
      return state
  }
}
