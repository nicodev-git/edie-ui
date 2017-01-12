import { concat } from 'lodash'
import {
  ADD_DIAGRAM_OBJECT
} from 'actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_DIAGRAM_OBJECT:
      return { ...state, objects: concat(state.objects, action.data), lastId: state.lastId + 1 }
  }
  return state
}
