import {
  AUTH_USER,
  INVALIDATE_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,

  ACTIVATE_USER,
  ACTIVATE_MSG
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true }
    case INVALIDATE_USER:
      return { ...state, error: '', authenticated: false }
    case AUTH_ERROR:
      return { ...state, error: action.msg }
    case FETCH_MESSAGE:
      return { ...state, message: action.payload }

    case ACTIVATE_USER:
      return { ...state, activated: true }
    case ACTIVATE_MSG:
      return { ...state, activationMsg: action.msg }
  }
  return state
}
