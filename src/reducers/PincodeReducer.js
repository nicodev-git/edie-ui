import {
  GENERATE_PINCODE
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case GENERATE_PINCODE:
      return { ...state, pincode: action.data }
  }
  return state
}
