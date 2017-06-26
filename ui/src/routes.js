/**
 * Created by Cheng on 6/25/17.
 */
import React from 'react'
import { Switch } from 'react-router'
import { Route, BrowserRouter } from 'react-router-dom'

import MainpageContainer from './containers/MainpageContainer'
import SigninContainer from './containers/auth/SigninContainer'

import RequireAuth from './components/auth/RequireAuth'

const Routes = () => ( // eslint-disable-line
  <BrowserRouter>
    <Switch>
      <Route exact path="/signin" component={SigninContainer} />
      <Route path="/" component={RequireAuth(MainpageContainer)}/>
    </Switch>
  </BrowserRouter>
)

export default Routes
