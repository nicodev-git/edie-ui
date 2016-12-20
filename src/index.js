import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router , browserHistory } from 'react-router';
import reducers from './reducers';
import Routes from './routes';
import reduxThunk from 'redux-thunk';


import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

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
    },

    search: {
        incidents: [],
        incidentDevices: [],
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

        showTraffic: true,
    }
}
const store = createStoreWithMiddleware(reducers, initialState);

const token = localStorage.getItem('token');

if (token) {
    store.dispatch({ type: AUTH_USER });
}

console.log('Version: 0.6.2')

ReactDOM.render(
    <Provider store={store}>
        {Routes}
    </Provider>
    , document.getElementById('app')
);