import { combineReducers } from 'redux'
import {reducer as FormReducer} from 'redux-form'
import AuthReducer from './AuthReducer'
import ChatReducer from './ChatReducer'
import DashboardReducer from './DashboardReducer'
import SettingsReducer from './SettingsReducer'
import DeviceReducer from './DeviceReducer'
import SearchReducer from './SearchReducer'
import DiagramReducer from './DiagramReducer'

const rootReducer = combineReducers({
  form: FormReducer,
  auth: AuthReducer,
  settings: SettingsReducer,
  dashboard: DashboardReducer,
  devices: DeviceReducer,
  search: SearchReducer,
  diagram: DiagramReducer,
  chat: ChatReducer
})

export default rootReducer
