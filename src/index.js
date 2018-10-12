import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'

import reducers from './reducers'
import App from './App'
import './style'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(
                 reducers, 
                 window.devToolsExtension && window.devToolsExtension()
               )
 //u need to activate the redux dev tools above... in the store
console.log('Version: 2018.1.109')
console.log('React Version: ' + React.version)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('app')
)
