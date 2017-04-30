import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Routes from './routes'
import './style/style.styl'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import { AUTH_USER } from './actions/types'
import { store } from './shared/GetStore'

const token = window.localStorage.getItem('token')

if (token) {
  store.dispatch({ type: AUTH_USER })
}

console.log('Version: 0.9.5')

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
        {Routes}
    </Provider>
  </MuiThemeProvider>
    , document.getElementById('app')
)
