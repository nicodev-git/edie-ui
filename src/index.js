import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Routes from './routes'
import './style'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import { store } from './shared/GetStore'

console.log('Version: 0.12.2')

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
        {Routes}
    </Provider>
  </MuiThemeProvider>
    , document.getElementById('app')
)
