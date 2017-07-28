import {
  FETCH_GAUGES
} from 'actions/types'

const INITIAL_STATE = {
  gauges: []
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_GAUGES:
      return { ...state, incidents: action.data }
    default:
      return state
  }
}
