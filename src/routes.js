import React from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router'

import MainContainer from './containers/page/MainContainer'
import SigninContainer from './containers/auth/SigninContainer'
import SignoutContainer from './containers/auth/SignoutContainer'

import Search from './components/page/content/search/Search'
import SearchIncidentsContainer from './containers/page/content/search/IncidentsContainer'
import SearchDevices from './components/page/content/search/Devices'
import SearchProcess from './components/page/content/search/Processes'
import ChatContainer from './containers/page/content/chat/ChatContainer'
import Incidents from './components/page/content/incidents/Incidents'
import BigIncidentsContainer from './containers/page/content/dashboard/BigIncidentsContainer'
import ThreatMap from './components/page/content/threatmap/Threatmap'
import Settings from './components/page/content/settings/Settings'
import SettingGeneralContainer from './containers/page/content/settings/general/GeneralContainer'
import SettingAgent from './components/page/content/settings/agent/Agents'
import SettingRulesContainer from './containers/page/content/settings/rule/RulesContainer'
import SettingMapsContainer from './containers/page/content/settings/maps/MapsContainer'
import SettingUsersContainer from './containers/page/content/settings/users/UsersContainer'
import SettingIdentitiesContainer from './containers/page/content/settings/identity/IdentitiesContainer'
import SettingCredentialsContainer from './containers/page/content/settings/credentials/CredentialsContainer'
import SettingTemplatesContainer from './containers/page/content/settings/template/TemplatesContainer'
import SettingParserTypesContainer from './containers/page/content/settings/parserTypes/ParserTypesContainer'
import SettingAdvancedContainer from './containers/page/content/settings/advanced/AdvancedContainer'

import DeviceContainer from './containers/page/content/device/DeviceContainer'
import DeviceMain from './components/page/content/device/main/Main'
import DeviceMainIncidentsContainer from './containers/page/content/device/main/incidents/MainIncidentsContainer'
import DeviceMainWorkflowsContainer from './containers/page/content/device/main/workflows/MainWorkflowsContainer'
import DeviceMainEventsContainer from './containers/page/content/device/main/events/MainEventsContainer'
import DeviceMainAdvancedContainer from './containers/page/content/device/main/advanced/MainAdvancedContainer'
import DeviceMainRuleAddContainer from './containers/page/content/device/main/ruleAdd/MainRulesAddContainer'
import DeviceMonitorsContainer from './containers/page/content/device/monitors/MonitorsContainer'
import DeviceConnectedContainer from './containers/page/content/device/connected/ConnectedContainer'
import DeviceInfoContainer from './containers/page/content/device/info/InfoContainer'
import DeviceTopology from './containers/page/content/device/topology/TopologyContainer'
import GroupDevicesContainer from './containers/page/content/device/devices/DevicesContainer'

import RequireAuth from './components/auth/RequireAuth'

const onMainEnter = (prevState, nextState, replace, callback) => {
  setTimeout(() => {
    window.dispatchEvent(new window.Event('resize'))
  }, 150)
  callback && callback()
}

export default(
  <Router history={browserHistory}>
    <Route path="/" component={RequireAuth(MainContainer)} onChange={onMainEnter}>
      <Route path="chat" component={ChatContainer} />
      <Route path="search" component={Search}>
        <IndexRoute component={SearchIncidentsContainer} />
        <Route path="incidents" component={SearchIncidentsContainer} />
        <Route path="devices" component={SearchDevices} />
        <Route path="process" component={SearchProcess} />
      </Route>
      <Route path="incidents" component={Incidents}/>
      <Route path="bigincidents" component={BigIncidentsContainer}/>
      <Route path="threatmap" component={ThreatMap}/>
      <Route path="settings" component={Settings}>
        <Route path="general" component={SettingGeneralContainer} />
        <Route path="agents" component={SettingAgent} />
        <Route path="rules" component={SettingRulesContainer} />
        <Route path="maps" component={SettingMapsContainer} />
        <Route path="users" component={SettingUsersContainer} />
        <Route path="identities" component={SettingIdentitiesContainer} />
        <Route path="credentials" component={SettingCredentialsContainer} />
        <Route path="templates" component={SettingTemplatesContainer} />
        <Route path="parserTypes" component={SettingParserTypesContainer} />
        <Route path="advanced" component={SettingAdvancedContainer} />
      </Route>

      <Route path="device/:deviceId" component={DeviceContainer}>
        <Route path="main" component={DeviceMain}>
          <Route path="incidents" component={DeviceMainIncidentsContainer}/>
          <Route path="workflows" component={DeviceMainWorkflowsContainer}/>
          <Route path="events" component={DeviceMainEventsContainer}/>
          <Route path="advanced" component={DeviceMainAdvancedContainer}/>
          <Route path="ruleAdd" component={DeviceMainRuleAddContainer}/>
        </Route>
        <Route path="topology" component={DeviceTopology}/>
        <Route path="monitor" component={DeviceMonitorsContainer}/>
        <Route path="connected" component={DeviceConnectedContainer}/>
        <Route path="info" component={DeviceInfoContainer}/>
        <Route path="list" component={GroupDevicesContainer}/>
      </Route>

    </Route>
    <Route path="/signin" component={SigninContainer} />
    <Route path="/signout" component={SignoutContainer} />
  </Router>
)
