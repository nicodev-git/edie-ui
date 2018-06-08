import {assign, concat, findIndex} from 'lodash'
import {DiagramTypes, findObject} from 'shared/Global'
import {
  OPEN_DIAGRAM_MODAL,

  ADD_DIAGRAM_OBJECT,
  UPDATE_DIAGRAM_OBJECT,

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
  SET_DIAGRAM_LINE_STEP_POINT,

  ADD_DIAGRAM_LINE,
  UPDATE_DIAGRAM_LINE,

  OPEN_DIAGRAM_OBJECT_MODAL,
  CLOSE_DIAGRAM_OBJECT_MODAL,

  SET_DIAGRAM_EDITING_TEXT,
  REMOVE_DIAGRAM_SELECTED_OBJECTS,

  SHOW_FILL_COLOR_PICKER,
  CHANGE_PICKER_COLOR,

  UPDATE_DIAGRAM_WORKFLOW
} from 'actions/types'

import {findStepPoints, getHandlePoints} from 'shared/LineUtil'

const reducer = function (state = {}, action) {
  switch (action.type) {
    case OPEN_DIAGRAM_MODAL: {
      const {data, flow} = action
      let objects = []
      let lastId = 100
      let lines = []
      if (data) {
        try {
          let parsed = JSON.parse(data)
          if (parsed.objects) objects = parsed.objects
          if (parsed.lines) lines = parsed.lines
          if (parsed.lastId) lastId = parsed.lastId
        } catch (e) {
          console.log(e)
        }
      }
      return {
        ...state,
        objects,
        lastId,
        lines,
        selected: [],
        hovered: null,
        isDragging: false,
        isResizing: false,
        isLineDrawing: false,

        flow,
        flowId: flow.uuid,
        lineStepPoint: -1
      }
    }

    case ADD_DIAGRAM_OBJECT:
      return {...state, objects: concat(state.objects, action.data), lastId: state.lastId + 1}

    case UPDATE_DIAGRAM_OBJECT:
      return {
        ...state,
        objects: state.objects.map(m => m.id === action.data.id ? action.data : m),
        selected: state.selected.map(m => m.id === action.data.id ? action.data : m)
      }

    case SELECT_DIAGRAM_OBJECT:
      return {...state, selected: action.data, hovered: null}

    case SET_HOVER_DIAGRAM_OBJECT:
      return {...state, hovered: action.data, hoverPoint: -1}

    case CLEAR_HOVER_DIAGRAM_OBJECT: {
      const {hovered} = state
      return {...state, hovered: hovered && hovered.id === action.data.id ? null : hovered}
    }

    case SET_HOVER_POINT:
      return {...state, hoverPoint: action.data}

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
      return {...state, isDragging: action.data}

    case SET_DIAGRAM_CURSOR_POS:
      return {...state, cursorPos: action.data}

    case MOVE_DIAGRAM_SELECTED_OBJECTS: {
      const {workflowItems} = action
      const selected = action.selected.map(obj => {
        if (obj.type !== DiagramTypes.OBJECT) return obj

        obj.x += action.data.x
        obj.y += action.data.y

        return obj
      })

      const lines = state.lines.map(line => {
        const found = selected.filter(obj => obj.type === DiagramTypes.OBJECT && (line.startObject.id === obj.id || line.endObject.id === obj.id))
        if (!found.length) return line

        let {startObject, endObject, startPoint, endPoint} = line
        startObject = findObject(found, {id: startObject.id}) || startObject
        endObject = findObject(found, {id: endObject.id}) || endObject

        const leftTpl = workflowItems[line.startObject.imgIndex]
        const rightTpl = workflowItems[line.endObject.imgIndex]

        const startPos = leftTpl.getConnectionPoint(startObject, startPoint)
        const endPos = rightTpl.getConnectionPoint(endObject, endPoint)
        // let startPos, endPos
        // const isStart = findObject(found, {id: startObject.id}) != null
        // if (isStart) {
        //     endPos = rightTpl.getConnectionPoint(endObject, endPoint)
        //     const nearest = getNearestPoint(endObject, rightTpl, endPoint, endPos, startObject, leftTpl)
        //     startPoint = nearest.point
        //     startPos = nearest.pos
        // } else {
        //     startPos = leftTpl.getConnectionPoint(startObject, startPoint)
        //     const nearest = getNearestPoint(startObject, leftTpl, startPoint, endObject, rightTpl)
        //     endPoint = nearest.point
        //     endPos = nearest.pos
        // }

        const stepPoints = findStepPoints(leftTpl, startPos, startPoint, rightTpl, endPos, endPoint)
        const handlePoints = getHandlePoints(startPos, stepPoints, endPos)

        return assign({}, line, {
          startObject,
          endObject,
          startPoint,
          endPoint,
          points: concat([], startPos, stepPoints, endPos),
          handlePoints
        })
      })
      return {
        ...state,
        selected,
        lines
      }
    }

    case SET_DIAGRAM_RESIZING_POINT:
      return {...state, resizePoint: action.data}

    case SET_DIAGRAM_RESIZING:
      return {...state, isResizing: action.data}

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
            default: return obj
          }
          return obj
        })
      }

    case SET_DIAGRAM_LINE_DRAWING:
      return {
        ...state,
        isLineDrawing: action.data,
        isLineDrawingStart: action.isDrawingStart,
        drawingLine: action.drawingLine,
        selected: []
      }

    case SET_DIAGRAM_LINE_START_POINT:
      return {
        ...state,
        lineStart: action.pos,
        lineStartObject: action.object,
        lineStartObjectPoint: action.connectionPoint
      }

    case SET_DIAGRAM_LINE_END_POINT:
      return {
        ...state,
        lineEnd: action.pos,
        lineEndObject: action.object,
        lineEndObjectPoint: action.connectionPoint
      }

    case SET_DIAGRAM_LINE_STEP_POINT:
      return {
        ...state,
        lineStepPoint: action.point
      }
    case ADD_DIAGRAM_LINE:
      return {...state, lines: concat(state.lines, action.data), lastId: state.lastId + 1}

    case UPDATE_DIAGRAM_LINE:
      return {...state, lines: state.lines.map(m => m.id === action.line.id ? action.line : m)}

    case OPEN_DIAGRAM_OBJECT_MODAL:
      return {...state, objectModalOpen: true, objectConfig: action.config, objectTpl: action.tpl}

    case CLOSE_DIAGRAM_OBJECT_MODAL:
      return {...state, objectModalOpen: false}

    case SET_DIAGRAM_EDITING_TEXT:
      return {...state, object: action.object}

    case REMOVE_DIAGRAM_SELECTED_OBJECTS: {
      const {objects, lines} = state
      const selected = action.objects
      return {
        ...state,
        objects: objects.filter(obj => findIndex(selected, {id: obj.id, type: DiagramTypes.OBJECT}) < 0),
        lines: lines.filter(line => {
          if (findIndex(selected, {id: line.id, type: DiagramTypes.LINE}) >= 0) return false
          if (findIndex(selected, {id: line.startObject.id, type: DiagramTypes.OBJECT}) >= 0) return false
          if (findIndex(selected, {id: line.endObject.id, type: DiagramTypes.OBJECT}) >= 0) return false
          return true
        }),
        selected: [],

        hovered: null,
        isDragging: false,
        isResizing: false,
        isLineDrawing: false
      }
    }

    case SHOW_FILL_COLOR_PICKER:
      return {...state, fillColorPickerOpen: !!action.visible, pickerColor: action.color}

    case CHANGE_PICKER_COLOR:
      return { ...state, pickerColor: action.color }

    case UPDATE_DIAGRAM_WORKFLOW: {
      let {objects} = state
      const {flowItems, flowItemDetails} = action.flow

      //Update Steps
      const items = flowItems || flowItemDetails
      objects = objects.map(object => {
        const index = findIndex(items, {uuid: object.data.uuid})
        if (index < 0) return object
        object.data.step = items[index].step
        return object
      })
      return { ...state, flow: action.flow, objects }
    }
    default: return state
  }
}

export default function (state = {}, action) {
  if (!action.stateId) return state
  let subState = state[action.stateId] || {}
  subState = reducer(subState, action)
  return { ...state, [action.stateId]: subState }
}
