import {
  SHOW_TAG_MODAL,
  FETCH_TAGS,
  ADD_TAG,
  UPDATE_TAG,
  REMOVE_TAG,
  SELECT_TAG
} from 'actions/types'

const initialState = {
  tags: [],
  tagDraw: 1,
  selectedTags: []
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
  }
  return state
}
