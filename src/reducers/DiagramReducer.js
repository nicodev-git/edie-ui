import { concat } from 'lodash'
import { DiagramTypes } from 'shared/Global'
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
  SET_DIAGRAM_RESIZING_POINT,
  RESIZE_DIAGRAM_SELECTED_OBJECTS,

  SET_DIAGRAM_LINE_DRAWING,
  SET_DIAGRAM_LINE_START_POINT,
  SET_DIAGRAM_LINE_END_POINT,

  ADD_DIAGRAM_LINE,

  OPEN_DIAGRAM_OBJECT_MODAL,
  CLOSE_DIAGRAM_OBJECT_MODAL
} from 'actions/types'

export default function (state = {}, action) {
  switch (action.type) {

    case OPEN_DEVICE_WF_DIAGRAM_MODAL:
      return { ...state, objects: [], lastId: 100, selected: [], lines: [], hovered: null, isDragging: false, isResizing: false, isLineDrawing: false }

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
        isLineDrawing: action.data ? state.isLineDrawing : false,
        resizePoint: action.data ? state.resizePoint : -1,
        cursorPos: action.pos
      }

    case SET_DIAGRAM_DRAGGING:
      return { ...state, isDragging: action.data }

    case SET_DIAGRAM_CURSOR_POS:
      return { ...state, cursorPos: action.data }

    case MOVE_DIAGRAM_SELECTED_OBJECTS:
      return {
        ...state,
        selected: state.selected.map(obj => {
          if (obj.type !== DiagramTypes.OBJECT) return obj

          obj.x += action.data.x
          obj.y += action.data.y
          return obj
        })
      }

    case SET_DIAGRAM_RESIZING_POINT:
      return { ...state, resizePoint: action.data }

    case SET_DIAGRAM_RESIZING:
      return { ...state, isResizing: action.data }

    case RESIZE_DIAGRAM_SELECTED_OBJECTS:
      return {
        ...state,
        selected: state.selected.map(obj => {
          if (obj.type !== DiagramTypes.OBJECT) return obj

          switch (state.resizePoint) {
            case 0:
              obj.x += action.data.x
              obj.y += action.data.y
              obj.w -= action.data.x
              obj.h -= action.data.y
              break

            case 1:
              obj.y += action.data.y
              obj.h -= action.data.y
              break

            case 2:
              obj.y += action.data.y
              obj.w += action.data.x
              obj.h -= action.data.y
              break

            case 3:
              obj.x += action.data.x
              obj.w -= action.data.x
              break

            case 4:
              obj.w += action.data.x
              break

            case 5:
              obj.x += action.data.x
              obj.w -= action.data.x
              obj.h += action.data.y
              break

            case 6:
              obj.h += action.data.y
              break

            case 7:
              obj.w += action.data.x
              obj.h += action.data.y
              break
          }
          return obj
        })
      }

    case SET_DIAGRAM_LINE_DRAWING:
      return { ...state, isLineDrawing: action.data, selected: [] }

    case SET_DIAGRAM_LINE_START_POINT:
      return { ...state, lineStart: action.pos, lineStartObject: action.object, lineStartObjectPoint: action.connectionPoint }

    case SET_DIAGRAM_LINE_END_POINT:
      return { ...state, lineEnd: action.data }

    case ADD_DIAGRAM_LINE:
      return { ...state, lines: concat(state.lines, action.data), lastId: state.lastId + 1 }

    case OPEN_DIAGRAM_OBJECT_MODAL:
      return { ...state, objectModalOpen: true, objectConfig: action.config }

    case CLOSE_DIAGRAM_OBJECT_MODAL:
      return { ...state, objectModalOpen: false }
  }
  return state
}
