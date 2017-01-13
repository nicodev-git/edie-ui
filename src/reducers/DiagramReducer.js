import { concat } from 'lodash'
import {
  ADD_DIAGRAM_OBJECT,
  OPEN_DEVICE_WF_DIAGRAM_MODAL,
  SELECT_DIAGRAM_OBJECT,
  SET_HOVER_DIAGRAM_OBJECT,
  CLEAR_HOVER_DIAGRAM_OBJECT,
  SET_HOVER_POINT,
  SET_DIAGRAM_MOUSE_DOWN,
  SET_DIAGRAM_DRAGGING,
  SET_DIAGRAM_CURSOR_POS,
  MOVE_DIAGRAM_SELECTED_OBJECTS,
  SET_DIAGRAM_RESIZING,
  SET_DIAGRAM_RESIZING_POINT
} from 'actions/types'

export default function (state = {}, action) {
  switch (action.type) {

    case OPEN_DEVICE_WF_DIAGRAM_MODAL:
      return { ...state, objects: [], lastId: 100, selected: [], hovered: null, isDragging: false, isResizing: false }

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

    case SET_DIAGRAM_MOUSE_DOWN:
      return {
        ...state,
        isMouseDown: action.data,
        mouseDownPos: action.data ? action.pos : state.mouseDownPos,
        mouseDownObject: action.downOn,
        isDragging: false,
        isResizing: false,
        resizePoint: -1
      }

    case SET_DIAGRAM_DRAGGING:
      return { ...state, isDragging: action.data }

    case SET_DIAGRAM_CURSOR_POS:
      return { ...state, cursorPos: action.data }

    case MOVE_DIAGRAM_SELECTED_OBJECTS:
      return {
        ...state,
        selected: state.selected.map(obj => {
          obj.x += action.data.x
          obj.y += action.data.y
          return obj
        })
      }

    case SET_DIAGRAM_RESIZING_POINT:
      return { ...state, resizePoint: action.data }

    case SET_DIAGRAM_RESIZING:
      return { ...state, isResizing: action.data }
  }
  return state
}
