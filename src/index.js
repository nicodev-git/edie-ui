import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'

import reducers from './reducers'
import App from './App'
import './style'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

console.log('Version: 2018.1.25')

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('app')
)
