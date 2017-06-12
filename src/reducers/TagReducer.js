import {
  FETCH_TAGS,
  ADD_TAG,
  SELECT_TAG
} from 'actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_TAGS:
      return { ...state, tags: action.data }
    case ADD_TAG:
      return { ...state, tags: [...state.tags, action.data] }
    case SELECT_TAG:
      return { ...state, selectedTag: action.tag }
  }
  return state
}
