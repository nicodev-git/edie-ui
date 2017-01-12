import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import Routes from './routes'
import reduxThunk from 'redux-thunk'
import './style/style.styl'

import { AUTH_USER } from './actions/types'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)

const initialState = {
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

    workflowCategories: []
  },

  search: {
    incidents: [],
    incidentDevices: []
  },

  settings: {
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
    lastId: 0
  }
}
const store = createStoreWithMiddleware(reducers, initialState)

const token = window.localStorage.getItem('token')

if (token) {
  store.dispatch({ type: AUTH_USER })
}

console.log('Version: 0.6.3')

ReactDOM.render(
    <Provider store={store}>
        {Routes}
    </Provider>
    , document.getElementById('app')
)

// _$(document).ready(function () {
//   React.render(<App />, document.body);
// });
