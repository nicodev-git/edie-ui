import {
  SHOW_TAG_MODAL,
  FETCH_TAGS,
  ADD_TAG,
  UPDATE_TAG,
  REMOVE_TAG,
  SELECT_TAG,

  MULTI_SELECT_TAG,
  FETCH_DEVICE_BY_TAGS,
  FETCH_WORKFLOW_BY_TAGS,
  FETCH_MONITORTPL_BY_TAGS,
  FETCH_DEVICETPL_BY_TAGS,
  FETCH_PARSERTYPE_BY_TAGS
} from 'actions/types'

const initialState = {
  tags: [],
  tagDraw: 1,
  selectedTags: [],
  multiSelTags: [],

  tagDevices: [],
  tagWorkflows: [],
  tagParserTypes: [],
  tagDeviceTpls: [],
  tagMonitorTpls: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_TAG_MODAL:
      return { ...state, tagModalOpen: !!action.visible, editTag: action.tag }
    case FETCH_TAGS:
      return { ...state, tags: action.data }
    case ADD_TAG:
      return { ...state, tagDraw: state.tagDraw + 1, tags: [...state.tags, action.data] }
    case UPDATE_TAG:
    case REMOVE_TAG:
      return { ...state, tagDraw: state.tagDraw + 1 }
    case SELECT_TAG:
      return { ...state, selectedTags: action.tags || [] }
    case MULTI_SELECT_TAG:
      return {...state, multiSelTags: action.tags}
    case FETCH_DEVICE_BY_TAGS:
      return {...state, tagDevices: action.data}
  }
  return state
}
