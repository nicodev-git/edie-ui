import { combineReducers } from 'redux'
import {reducer as FormReducer} from 'redux-form'
import AuthReducer from './AuthReducer'
import DashboardReducer from './DashboardReducer'
import SettingsReducer from './SettingsReducer'
import DeviceReducer from './DeviceReducer'
import SearchReducer from './SearchReducer'

const rootReducer = combineReducers({
  form: FormReducer,
  auth: AuthReducer,
  settings: SettingsReducer,
  dashboard: DashboardReducer,
  devices: DeviceReducer,
  search: SearchReducer
})

export default rootReducer
