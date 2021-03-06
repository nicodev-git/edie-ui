/**
 * Created by Cheng on 6/25/17.
 */
import React from 'react'
import { Switch } from 'react-router'
import { Route, BrowserRouter } from 'react-router-dom'

import MainpageContainer from './containers/MainpageContainer'
import SigninContainer from './containers/auth/SigninContainer'
// import Signin2Container from './containers/auth/Signin2Container'

import RequireAuth from './components/auth/RequireAuth'

export default class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/signin" component={SigninContainer}/>
          {/*<Route exact path="/signin" component={Signin2Container}/>*/}
          <Route path="/" component={RequireAuth(MainpageContainer)}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
