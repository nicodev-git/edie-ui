import { FETCH_TAGS } from 'actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_TAGS:
      return { ...state, tags: action.data }
  }
  return state
}
