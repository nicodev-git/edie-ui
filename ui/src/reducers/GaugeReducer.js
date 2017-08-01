import {
  FETCH_GAUGES,
  FETCH_GAUGE_ITEMS,
  ADD_GAUGE_ITEM,
  UPDATE_GAUGE_ITEM,
  REMOVE_GAUGE_ITEM
} from 'actions/types'

const INITIAL_STATE = {
  gauges: [],
  gaugeItems: []
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_GAUGES:
      return { ...state, gauges: action.data }
    case FETCH_GAUGE_ITEMS:
      return { ...state, gaugeItems: action.data }
    case ADD_GAUGE_ITEM:
      return { ...state, gaugeItems: [...state.gaugeItems, action.data]}
    case UPDATE_GAUGE_ITEM:
      return { ...state, gaugeItems: state.gaugeItems.map(p => p.id === action.data.id ? action.data : p) }
    case REMOVE_GAUGE_ITEM:
      return { ...state, gaugeItems: state.gaugeItems.filter(p => p.id !== action.data.id) }
    default:
      return state
  }
}
