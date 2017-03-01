import {
  FETCH_ATTACKERS
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ATTACKERS:
      return { ...state, attackers: action.data }
  }
  return state
}
