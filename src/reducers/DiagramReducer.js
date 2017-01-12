import { concat } from 'lodash'
import {
  ADD_DIAGRAM_OBJECT,
  OPEN_DEVICE_WF_DIAGRAM_MODAL,
  SELECT_DIAGRAM_OBJECT,
  SET_HOVER_DIAGRAM_OBJECT,
  CLEAR_HOVER_DIAGRAM_OBJECT,
  SET_HOVER_POINT
} from 'actions/types'

export default function (state = {}, action) {
  switch (action.type) {

    case OPEN_DEVICE_WF_DIAGRAM_MODAL:
      return { ...state, objects: [], lastId: 100, selected: [] }

    case ADD_DIAGRAM_OBJECT:
      return { ...state, objects: concat(state.objects, action.data), lastId: state.lastId + 1 }

    case SELECT_DIAGRAM_OBJECT:
      return { ...state, selected: action.data, hovered: null }

    case SET_HOVER_DIAGRAM_OBJECT:
      return { ...state, hovered: action.data, hoverPoint: -1 }

    case CLEAR_HOVER_DIAGRAM_OBJECT: {
      const {hovered} = state
      return { ...state, hovered: hovered && hovered.id === action.data.id ? null : hovered }
    }

    case SET_HOVER_POINT:
      return { ...state, hoverPoint: action.data }
  }
  return state
}
