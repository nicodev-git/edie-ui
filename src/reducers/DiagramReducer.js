import {
  ADD_DIAGRAM_OBJECT
} from 'actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_DIAGRAM_OBJECT:
      return { ...state }
  }
  return state
}
