import {
  AUTH_USER,
  INVALIDATE_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,

  OPEN_ACTIVATION_MODAL,
  CLOSE_ACTIVATION_MODAL,
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
      return { ...state }
    case ACTIVATE_MSG:
      return { ...state, activationMsg: action.msg }

    case OPEN_ACTIVATION_MODAL:
      return { ...state, activationModalOpen: true }
    case CLOSE_ACTIVATION_MODAL:
      return { ...state, activationModalOpen: false }
  }
  return state
}
