import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'
import reduxThunk from 'redux-thunk'
import moment from 'moment'

import {dateFormat} from 'shared/Global'

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
    mainIncidentDraw: 1,

    selectedDevice: null,

    images: [],

    sidebarProfileMenuOpen: false,
    sidebarMessageMenuOpen: false,

    sidebarSearchActive: false,

    apiErrorModalOpen: false,
    apiError: ''
  },

  devices: {
    devices: [],

    mapDevices: [],
    mapLines: [],

    incidents: [],
    incidentDraw: 1,
    addIncidentModalVisible: false,

    rules: [],
    rawIncidents: [],
    physicalRules: [],

    monitorPickerVisible: false,

    wizardInitialValues: {},
    monitorWizardVisible: false,
    monitorTags: [],
    deviceTags: [],

    basicMonitors: [],
    monitors: [],
    monitorsUpdateTime: 0,

    eventLogs: [],
    apps: [],
    processes: [],
    monitorNetworks: [],
    moniotrLogNames: [],
    selectedLogName: 'Application',

    deviceAppTab: 'app',

    workflowCategories: [],
    workflows: [],
    workflowListDraw: 1
  },

  search: {
    incidents: [],
    incidentDevices: [],
    incidentDraw: 1,
    params: {
      query: '',
      workflow: '',
      tag: '',
      collections: 'incident,event',
      severity: 'HIGH,MEDIUM',
      monitorTypes: '',
      dateFrom: moment().add(-1, 'days').startOf('day').format(dateFormat),
      dateTo: moment().endOf('day').format(dateFormat)
    },
    incidentParams: {
      severity: ['HIGH', 'MEDIUM'],
      fixed: 'false',
      description: '',
      deviceid: '*',
      afterStartTimestamp: moment().startOf('year').valueOf(),
      beforeStartTimestamp: moment().endOf('year').valueOf(),
      sort: 'startTimestamp,desc',
      draw: 1
    },
    queryChips: [],
    fields: [],
    fieldTopValues: [],
    selectedWfs: [],
    searchTags: [],

    searchOptions: [],
    sysSearchOptions: [],
    selectedCategory: '',
    workflowFilter: '',

    relDevices: [],
    irrelDevices: [],
    searchFields: ['ip'],
    selectedSearchFields: [],
    searchRecordCounts: []
  },

  settings: {
    envVarAvailable: false,
    envVars: [],
    identities: [],
    credentials: [],

    deviceCategories: [],
    deviceTemplates: [],
    monitorTemplates: [],
    tplImageModalVisible: false,
    selectedDeviceMonitors: [],
    editTplWorkflows: [],

    maps: [],
    editMap: null,

    editUser: null,
    editUserPin: '',

    parserTypeDraw: 1,
    parserTypes: [],
    editParserTypeTags: [],

    workflows: [],
    editWorkflowTags: [],

    showTraffic: true,

    monitorTplTags: []
  },

  attackers: {
    attackers: []
  },

  diagram: {
    objects: [],
    lines: [],
    lastId: 0,

    backImg: window.btoa('<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 0 10 L 40 10 M 10 0 L 10 40 M 0 20 L 40 20 M 20 0 L 20 40 M 0 30 L 40 30 M 30 0 L 30 40" fill="none" stroke="#e0e0e0" opacity="0.2" stroke-width="1"/><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e0e0" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>'),

    selected: []
  },
  tag: {
    tags: [],
    tagDraw: 1,
    selectedTags: []
  }
}

export const store = createStoreWithMiddleware(reducers, initialState)
