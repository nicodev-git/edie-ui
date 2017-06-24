import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import reducers from './reducers'
import Routes from './routes'
import './style'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

console.log('Version: 0.13.1')

injectTapEventPlugin()
ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
        {Routes}
    </Provider>
  </MuiThemeProvider>
    , document.getElementById('app')
)
