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
} from './types'

export function openDiagramModal (stateId, data, flow) {
  return dispatch => {
    dispatch({
      type: OPEN_DIAGRAM_MODAL,
      data,
      flow,
      stateId
    })
  }
}

export function addDiagramObject (stateId, object) {
  return dispatch => {
    dispatch({
      type: ADD_DIAGRAM_OBJECT,
      data: object,
      stateId
    })
  }
}

export function updateDiagramObject (stateId, object) {
  return dispatch => {
    dispatch({
      type: UPDATE_DIAGRAM_OBJECT,
      data: object,
      stateId
    })
  }
}

export function selectDiagramObject (stateId, object) {
  return dispatch => {
    dispatch({
      type: SELECT_DIAGRAM_OBJECT,
      data: object ? [object] : [],
      stateId
    })
  }
}

export function setHoverDiagramObject (stateId, object) {
  return dispatch => {
    dispatch({
      type: SET_HOVER_DIAGRAM_OBJECT,
      data: object,
      stateId
    })
  }
}

export function clearHoverDiagramObject (stateId, object) {
  return dispatch => {
    dispatch({
      type: CLEAR_HOVER_DIAGRAM_OBJECT,
      data: object,
      stateId
    })
  }
}

export function setHoverPoint (stateId, point) {
  return dispatch => {
    dispatch({
      type: SET_HOVER_POINT,
      data: point,
      stateId
    })
  }
}

export function setDiagramMouseDown (stateId, isDown, pos, downOn) {
  return dispatch => {
    dispatch({
      type: SET_DIAGRAM_MOUSE_DOWN,
      data: isDown,
      pos,
      downOn,
      stateId
    })
  }
}

export function setDiagramDragging (stateId, dragging) {
  return dispatch => {
    dispatch({
      type: SET_DIAGRAM_DRAGGING,
      data: dragging,
      stateId
    })
  }
}

export function setDiagramCursorPos (stateId, pos) {
  return dispatch => {
    dispatch({
      type: SET_DIAGRAM_CURSOR_POS,
      data: pos,
      stateId
    })
  }
}

export function moveDiagramSelectedObjects (stateId, offset, workflowItems, selected) {
  return dispatch => {
    dispatch({
      type: MOVE_DIAGRAM_SELECTED_OBJECTS,
      data: offset,
      workflowItems,
      stateId,
      selected
    })
  }
}

export function setDiagramResizing (stateId, resizing) {
  return dispatch => {
    dispatch({
      type: SET_DIAGRAM_RESIZING,
      data: resizing,
      stateId
    })
  }
}

export function setDiagramResizingPoint (stateId, point) {
  return dispatch => {
    dispatch({
      type: SET_DIAGRAM_RESIZING_POINT,
      data: point,
      stateId
    })
  }
}

export function resizeDiagramSelectedObjects (stateId, offset) {
  return dispatch => {
    dispatch({
      type: RESIZE_DIAGRAM_SELECTED_OBJECTS,
      data: offset,
      stateId
    })
  }
}

export function setDiagramLineDrawing (stateId, isDrawing, isDrawingStart, drawingLine) {
  return dispatch => {
    dispatch({
      type: SET_DIAGRAM_LINE_DRAWING,
      data: isDrawing,
      isDrawingStart,
      drawingLine,
      stateId
    })
  }
}

export function setDiagramLineStartPoint (stateId, pos, object, connectionPoint) {
  return dispatch => {
    dispatch({
      type: SET_DIAGRAM_LINE_START_POINT,
      pos,
      object,
      connectionPoint,
      stateId
    })
  }
}

export function setDiagramLineEndPoint (stateId, pos, object, connectionPoint) {
  return dispatch => {
    dispatch({
      type: SET_DIAGRAM_LINE_END_POINT,
      pos,
      object,
      connectionPoint,
      stateId
    })
  }
}

export function setDiagramLineStepPoint (stateId, point) {
  return dispatch => {
    dispatch({
      type: SET_DIAGRAM_LINE_STEP_POINT,
      point,
      stateId
    })
  }
}

export function addDiagramLine (stateId, line) {
  return dispatch => {
    dispatch({
      type: ADD_DIAGRAM_LINE,
      data: line,
      stateId
    })
  }
}

export function updateDiagramLine (stateId, line) {
  return dispatch => {
    dispatch({
      type: UPDATE_DIAGRAM_LINE,
      line,
      stateId
    })
  }
}

export function openDiagramObjectModal (stateId, config, tpl) {
  return dispatch => {
    dispatch({
      type: OPEN_DIAGRAM_OBJECT_MODAL,
      config,
      tpl,
      stateId
    })
  }
}

export function closeDiagramObjectModal (stateId) {
  return dispatch => {
    dispatch({
      type: CLOSE_DIAGRAM_OBJECT_MODAL,
      stateId
    })
  }
}

export function setDiagramEditingText (stateId, object) {
  return dispatch => {
    dispatch({
      type: SET_DIAGRAM_EDITING_TEXT,
      object,
      stateId
    })
  }
}

export function removeDiagramSelectedObjects (stateId, objects) {
  return dispatch => {
    dispatch({
      type: REMOVE_DIAGRAM_SELECTED_OBJECTS,
      objects,
      stateId
    })
  }
}

export function showFillColorPicker (stateId, visible, color) {
  return dispatch => {
    dispatch({
      type: SHOW_FILL_COLOR_PICKER,
      visible,
      color,
      stateId
    })
  }
}

export function changePickerColor (stateId, color) {
  return dispatch => {
    dispatch({
      type: CHANGE_PICKER_COLOR,
      color,
      stateId
    })
  }
}

export function updateDiagramWorkflow (stateId, flow) {
  return dispatch => {
    dispatch({
      type: UPDATE_DIAGRAM_WORKFLOW,
      flow,
      stateId
    })
  }
}
