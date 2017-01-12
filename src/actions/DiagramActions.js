import {

  ADD_DIAGRAM_OBJECT,
  SELECT_DIAGRAM_OBJECT

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
