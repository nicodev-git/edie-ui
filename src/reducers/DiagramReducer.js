import { concat } from 'lodash'
import {
  ADD_DIAGRAM_OBJECT,
  OPEN_DEVICE_WF_DIAGRAM_MODAL,
  SELECT_DIAGRAM_OBJECT
} from 'actions/types'

export default function (state = {}, action) {
  switch (action.type) {

    case OPEN_DEVICE_WF_DIAGRAM_MODAL:
      return { ...state, objects: [], lastId: 100, selected: [] }

    case ADD_DIAGRAM_OBJECT:
      return { ...state, objects: concat(state.objects, action.data), lastId: state.lastId + 1 }

    case SELECT_DIAGRAM_OBJECT:
      return { ...state, selected: action.data }
  }
  return state
}
