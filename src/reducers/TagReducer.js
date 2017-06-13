import {
  SHOW_TAG_MODAL,
  FETCH_TAGS,
  ADD_TAG,
  UPDATE_TAG,
  REMOVE_TAG,
  SELECT_TAG
} from 'actions/types'

export default function (state = {}, action) {
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
      return { ...state, selectedTag: action.tag }
  }
  return state
}
