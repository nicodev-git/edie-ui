import {
  ADD_DIAGRAM_OBJECT
} from './types'

export function addDiagramObject (object) {
  return dispatch => {
    dispatch({
      type: ADD_DIAGRAM_OBJECT,
      data: object
    })
  }
}
