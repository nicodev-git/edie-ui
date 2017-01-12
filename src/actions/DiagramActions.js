import {

  ADD_DIAGRAM_OBJECT,
  SELECT_DIAGRAM_OBJECT,

  SET_HOVER_DIAGRAM_OBJECT,
  CLEAR_HOVER_DIAGRAM_OBJECT

} from './types'

export function addDiagramObject (object) {
  return dispatch => {
    dispatch({
      type: ADD_DIAGRAM_OBJECT,
      data: object
    })
  }
}

export function selectDiagramObject (object) {
  return dispatch => {
    dispatch({
      type: SELECT_DIAGRAM_OBJECT,
      data: [object]
    })
  }
}

export function setHoverDiagramObject (object) {
  return dispatch => {
    dispatch({
      type: SET_HOVER_DIAGRAM_OBJECT,
      data: object
    })
  }
}

export function clearHoverDiagramObject (object) {
  return dispatch => {
    dispatch({
      type: CLEAR_HOVER_DIAGRAM_OBJECT,
      data: object
    })
  }
}
