import React from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router'

import MainContainer from './containers/MainContainer'
import SigninContainer from './containers/auth/SigninContainer'
import SignoutContainer from './containers/auth/SignoutContainer'

import SearchGeneric from './containers/search/GenericSearchContainer'
import ChatContainer from './containers/chat/ChatContainer'
import ThreatMapContainer from './containers/threatmap/ThreatMapContainer'
import Settings from './components/sidebar/settings/Settings'
import SettingGeneralContainer from './containers/settings/general/GeneralContainer'
import SettingAgent from './components/sidebar/settings/agent/Agents'
import SettingRulesContainer from './containers/settings/rule/RulesContainer'
import SettingMapsContainer from './containers/settings/maps/MapsContainer'
import SettingUsersContainer from './containers/settings/users/UsersContainer'
import SettingIdentitiesContainer from './containers/settings/identity/IdentitiesContainer'
import SettingCredentialsContainer from './containers/settings/credentials/CredentialsContainer'
import SettingTemplatesContainer from './containers/settings/template/TemplatesContainer'
import SettingParserTypesContainer from './containers/settings/parserTypes/ParserTypesContainer'
import SettingTagsContainer from './containers/settings/tag/TagsContainer'
import SettingAdvancedContainer from './containers/settings/advanced/AdvancedContainer'

import DeviceContainer from './containers/device/DeviceContainer'
import DeviceMain from './components/dashboard/map/device/main/Main'
import DeviceMainIncidentsContainer from './containers/device/main/incidents/MainIncidentsContainer'
import DeviceMainWorkflowsContainer from './containers/device/main/workflows/MainWorkflowsContainer'
import DeviceMainAdvancedContainer from './containers/device/main/advanced/MainAdvancedContainer'
import DeviceMonitorsContainer from './containers/device/monitors/MonitorsContainer'
import DeviceEventLogs from './containers/device/monitors/EventLogsContainer'
import DeviceApps from './containers/device/monitors/AppsContainer'
import DeviceProcesses from './containers/device/monitors/ProcessContainer'
import DeviceServices from './containers/device/monitors/ServiceContainer'
import DeviceUsers from './containers/device/monitors/UsersContainer'
import DeviceFirewall from './containers/device/monitors/FirewallContainer'
import DeviceNetwork from './containers/device/monitors/NetworkContainer'
import DeviceCommand from './containers/device/monitors/CommandContainer'

import DeviceConnectedContainer from './containers/device/connected/ConnectedContainer'
import DeviceInfoContainer from './containers/device/info/InfoContainer'
import DeviceTopology from './containers/device/topology/TopologyContainer'
import GroupDevicesContainer from './containers/device/devices/DevicesContainer'

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
      <Route path="search" component={SearchGeneric}/>
      <Route path="threatmap" component={ThreatMapContainer}/>
      <Route path="settings" component={Settings}>
        <IndexRoute component={SettingGeneralContainer} />
        <Route path="general" component={SettingGeneralContainer} />
        <Route path="agents" component={SettingAgent} />
        <Route path="tags" component={Settings}>
          <IndexRoute component={SettingTagsContainer}/>
          <Route path="rules" component={SettingRulesContainer} />
          <Route path="templates" component={SettingTemplatesContainer} />
          <Route path="parserTypes" component={SettingParserTypesContainer} />
        </Route>

        <Route path="maps" component={SettingMapsContainer} />
        <Route path="users" component={Settings}>
          <IndexRoute component={SettingUsersContainer}/>
          <Route path="credentials" component={SettingCredentialsContainer} />
        </Route>
        <Route path="identities" component={SettingIdentitiesContainer} />
        <Route path="advanced" component={SettingAdvancedContainer} />
      </Route>

      <Route path="device/:deviceId" component={DeviceContainer}>
        <Route path="main" component={DeviceMain}>
          <IndexRoute component= {DeviceMainIncidentsContainer}/>
          <Route path="incidents" component={DeviceMainIncidentsContainer}/>
          <Route path="workflows" component={DeviceMainWorkflowsContainer}/>
          <Route path="advanced" component={DeviceMainAdvancedContainer}/>
        </Route>
        <Route path="topology" component={DeviceTopology}/>
        <Route path="monitor">
          <IndexRoute component={DeviceMonitorsContainer}/>
          <Route path="eventlog" component={DeviceEventLogs}/>
          <Route path="app" component={DeviceApps}/>
          <Route path="process" component={DeviceProcesses}/>
          <Route path="service" component={DeviceServices}/>
          <Route path="user" component={DeviceUsers}/>
          <Route path="firewall" component={DeviceFirewall}/>
          <Route path="network" component={DeviceNetwork}/>
          <Route path="command" component={DeviceCommand}/>
        </Route>
        <Route path="connected" component={DeviceConnectedContainer}/>
        <Route path="info" component={DeviceInfoContainer}/>
        <Route path="list" component={GroupDevicesContainer}/>
      </Route>

      <Route path="signout" component={SignoutContainer} />
    </Route>
    <Route path="/signin" component={SigninContainer} />
  </Router>
)
