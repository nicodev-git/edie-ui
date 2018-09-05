import {sortBy} from 'lodash'
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
  REMOVE_SIM_SAMPLE,
  UPDATE_WF_SIM_STATE,
  UPDATE_WF_SIM_RES,

  FETCH_TEST_GROUPS,
  ADD_TEST_GROUP,
  UPDATE_TEST_GROUP,
  REMOVE_TEST_GROUP,

  FETCH_TEST_CASES,
  ADD_TEST_CASE,
  UPDATE_TEST_CASE,
  REMOVE_TEST_CASE,

  ADD_SHAPE,
  UPDATE_SHAPE,
  REMOVE_SHAPE,
  UPDATE_SHAPE_SCRIPT_RESULT,
  UPDATE_SHAPE_SCRIPT_STATUS,

  FETCH_TEST_INCIDENTS,

  FETCH_OUTPUT_OBJECTS,
  ADD_OUTPUT_OBJECT,
  UPDATE_OUTPUT_OBJECT,
  REMOVE_OUTPUT_OBJECT
} from 'actions/types'

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
  simSamples: [],
  wfSimulationState: false,

  testGroups: [],
  testCases: [],
  testIncidents: [],

  shapeScriptResult: [],

  outputObjects: []
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
      if (action.data.id === selectedWorkflow.id) selectedWorkflow = action.data
      return {
        ...state,
        workflows: state.workflows.map(p => p.id === action.data.id ? action.data : p),
        selectedWorkflow
      }
    }

    case REMOVE_WORKFLOW:
      return {...state, workflows: state.workflows.filter(p => p.id !== action.data.id)}

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
      return {...state, groups: sortBy([...state.groups, action.data], a => a.name.toLowerCase())}
    case UPDATE_GROUP:
      return {...state, groups: sortBy(state.groups.map(p => p.id === action.data.id ? action.data : p), a => a.name.toLowerCase())}
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

    case ADD_SHAPE:
      return { ...state, shapes: [...state.shapes, action.data] }
    case UPDATE_SHAPE:
      return { ...state, shapes: state.shapes.map(p => p.id === action.data.id ? action.data : p)}
    case REMOVE_SHAPE:
      return { ...state, shapes: state.shapes.filter(p => p.id !== action.data.id)}
    case UPDATE_SHAPE_SCRIPT_RESULT:
      return { ...state, shapeScriptResult: action.data }
    case UPDATE_SHAPE_SCRIPT_STATUS:
      return { ...state, shapeScriptStatus: action.data }

    case SHOW_WF_SETTING_MODAL:
      return {...state, wfSettingModalOpen: action.visible, editWfSetting: action.data}

    case SHOW_WF_SIMULATION_MODAL:
      return {...state, wfSimulationModalOpen: action.visible}
    case UPDATE_WF_SIM_RES:
      return {...state, wfSimulationRes: action.data}
    case UPDATE_WF_SIM_STATE:
      return { ...state, wfSimulationState: action.data }

    case FETCH_SIM_SAMPLES:
      return { ...state, simSamples: action.data }
    case ADD_SIM_SAMPLE:
      return { ...state, simSamples: [...state.simSamples, action.data]}
    case REMOVE_SIM_SAMPLE:
      return { ...state, simSamples: state.simSamples.filter(p => p.id !== action.data.id) }

    case FETCH_TEST_GROUPS:
      return { ...state, testGroups: action.data }
    case ADD_TEST_GROUP:
      return { ...state, testGroups: [...state.testGroups, action.data] }
    case UPDATE_TEST_GROUP:
      return { ...state, testGroups: state.testGroups.map(p => p.id === action.data.id ? action.data : p) }
    case REMOVE_TEST_GROUP:
      return { ...state, testGroups: state.testGroups.filter(p => p.id !== action.data.id) }

    case FETCH_TEST_CASES:
      return { ...state, testCases: action.data }
    case ADD_TEST_CASE:
      return { ...state, testCases: [...state.testCases, action.data] }
    case UPDATE_TEST_CASE:
      return { ...state, testCases: state.testCases.map(p => p.id === action.data.id ? action.data : p) }
    case REMOVE_TEST_CASE:
      return { ...state, testCases: state.testCases.filter(p => p.id !== action.data.id) }
    case FETCH_TEST_INCIDENTS:
      return { ...state, testIncidents: action.data }

    case FETCH_OUTPUT_OBJECTS:
      return { ...state, outputObjects: action.data }
    case ADD_OUTPUT_OBJECT:
      return { ...state, outputObjects: [...state.outputObjects, action.data] }
    case UPDATE_OUTPUT_OBJECT:
      return { ...state, outputObjects: state.outputObjects.map(p => p.id === action.data.id ? action.data : p) }
    case REMOVE_OUTPUT_OBJECT:
      return { ...state, outputObjects: state.outputObjects.filter(p => p.id !== action.data.id) }

    default:
      return state
  }
}
