import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import Routes from './routes'
import reduxThunk from 'redux-thunk'
import './style/style.styl'

import { AUTH_USER } from './actions/types'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)

const initialState = {
  auth: {
    activationChecked: false
  },
  dashboard: {
    stats: {
      open: 0,
      month: 0,
      today: 0,
      attackers: 0
    },

    maps: [],
    mapDevices: [],
    mapLines: [],

    incidents: [],

    selectedDevice: null,

    images: [],

    apiErrorModalOpen: false,
    apiError: ''
  },

  devices: {
    devices: [],

    incidents: [],
    incidentDraw: 1,
    addIncidentModalVisible: false,

    rules: [],
    rawIncidents: [],
    physicalRules: [],

    monitorPickerVisible: false,

    wizardInitialValues: {},
    monitorWizardVisible: false,

    basicMonitors: [],
    monitors: [],

    eventLogs: [],
    apps: [],
    processes: [],

    workflowCategories: [],
    workflows: [],
    workflowListDraw: 1
  },

  search: {
    incidents: [],
    incidentDevices: [],
    incidentDraw: 1
  },

  settings: {
    envVarAvailable: false,
    envVars: [],
    identities: [],
    credentials: [],

    deviceTemplates: [],
    monitorTemplates: [],
    tplImageModalVisible: false,

    maps: [],
    editMap: null,

    editUser: null,
    editUserPin: '',

    parserTypeDraw: 1,
    parserTypes: [],

    showTraffic: true
  },

  diagram: {
    objects: [],
    lines: [],
    lastId: 0,

    backImg: window.btoa('<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 0 10 L 40 10 M 10 0 L 10 40 M 0 20 L 40 20 M 20 0 L 20 40 M 0 30 L 40 30 M 30 0 L 30 40" fill="none" stroke="#e0e0e0" opacity="0.2" stroke-width="1"/><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e0e0" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>'),

    selected: []
  }
}
const store = createStoreWithMiddleware(reducers, initialState)

const token = window.localStorage.getItem('token')

if (token) {
  store.dispatch({ type: AUTH_USER })
}

console.log('Version: 0.8.6')

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
        {Routes}
    </Provider>
  </MuiThemeProvider>
    , document.getElementById('app')
)
