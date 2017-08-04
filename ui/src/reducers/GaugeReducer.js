import {
  FETCH_GAUGES,
  FETCH_GAUGE_ITEMS,

  FETCH_GAUGE_BOARDS,
  ADD_GAUGE_BOARD,
  UPDATE_GAUGE_BOARD,
  REMOVE_GAUGE_BOARD,

  SELECT_GAUGE_BOARD
} from 'actions/types'

const INITIAL_STATE = {
  gauges: [],
  gaugeItems: [],
  gaugeBoards: []
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_GAUGES:
      return { ...state, gauges: action.data }
    case FETCH_GAUGE_ITEMS:
      return { ...state, gaugeItems: action.data }

    case FETCH_GAUGE_BOARDS:
      return { ...state, gaugeBoards: action.data }
    case ADD_GAUGE_BOARD:
      return { ...state, gaugeBoards: [...state.gaugeBoards, action.data]}
    case UPDATE_GAUGE_BOARD:
      return { ...state, gaugeBoards: state.gaugeBoards.map(p => p.id === action.data.id ? action.data : p) }
    case REMOVE_GAUGE_BOARD:
      return { ...state, gaugeBoards: state.gaugeBoards.filter(p => p.id !== action.data.id) }
    case SELECT_GAUGE_BOARD:
      return { ...state, selectedGaugeBoard: action.data }
    default:
      return state
  }
}
