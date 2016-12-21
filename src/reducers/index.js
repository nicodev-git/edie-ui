import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import authReducer from './auth_reducer'
import dashboardReducer from './DashboardReducer'
import settingsReducer from './SettingsReducer'
import deviceReducer from './DeviceReducer'
import searchReducer from './SearchReducer'

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  settings: settingsReducer,
  dashboard: dashboardReducer,
  devices: deviceReducer,
  search: searchReducer
})

export default rootReducer
