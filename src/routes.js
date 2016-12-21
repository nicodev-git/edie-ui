import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { Router , hashHistory, browserHistory } from 'react-router'

import Main from './components/page/Main'
import Signin from './components/auth/signin'
import Signup from './components/auth/signup'
import Signout from './components/auth/signout'

import Search from './components/page/content/search/Search'
import SearchIncidents from './components/page/content/search/Incidents'
import SearchDevices from './components/page/content/search/Devices'
import SearchProcess from './components/page/content/search/Processes'
import Chat from './components/page/content/chat/Chat'
import Incidents from './components/page/content/incidents/Incidents'
import BigIncidents from './components/page/content/dashboard/incidents/BigIncidents'
import Threatmap from './components/page/content/threatmap/ThreatMap'
import Settings from './components/page/content/settings/Settings'
import SettingGeneral from './components/page/content/settings/general/General'
import SettingAgent from './components/page/content/settings/agent/Agents'
import SettingRules from './components/page/content/settings/rule/Rules'
import SettingMaps from './components/page/content/settings/maps/Maps'
import SettingUsers from './components/page/content/settings/users/Users'
import SettingIdentity from './components/page/content/settings/identity/Identities'
import SettingCredentials from './components/page/content/settings/credentials/Credentials'
import SettingTemplates from './components/page/content/settings/template/Templates'
import SettingAdvanced from './components/page/content/settings/advanced/Advanced'

import Device from './components/page/content/device/Device'
import DeviceMain from './components/page/content/device/main/Main'
import DeviceMainIncidents from './components/page/content/device/main/incidents/MainIncidents'
import DeviceMainRules from './components/page/content/device/main/rules/MainRules'
import DeviceMainRawIncidents from './components/page/content/device/main/raw-incidents/MainRawIncidents'
import DeviceMainAdvanced from './components/page/content/device/main/advanced/MainAdvanced'
import DeviceMainRuleAdd from './components/page/content/device/main/rules/MainRulesAdd'
import DeviceMonitors from './components/page/content/device/monitors/Monitors'
import DeviceConnected from './components/page/content/device/connected/Connected'
import DeviceInfo from './components/page/content/device/info/Info'

import DeviceList from './components/DeviceList'

import RequireAuth from './components/auth/require_auth'

const onMainEnter = (prevState, nextState, replace, callback) => {
    console.log("On Main Change")
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
    }, 150)
    callback && callback()
}

export default(
    <Router history={hashHistory}>
        <Route path="/"  component={RequireAuth(Main)} onChange={onMainEnter}>
            <Route path="chat"  component={Chat} />
            <Route path="search"  component={Search}>
                <Route path="incidents" component={SearchIncidents} />
                <Route path="devices" component={SearchDevices} />
                <Route path="process" component={SearchProcess} />
            </Route>
            <Route path="incidents" component={Incidents}/>
            <Route path="bigincidents" component={BigIncidents}/>
            <Route path="threatmap" component={Threatmap}/>
            <Route path="settings" component={Settings}>
                <Route path="general" component={SettingGeneral} />
                <Route path="agents" component={SettingAgent} />
                <Route path="rules" component={SettingRules} />
                <Route path="maps" component={SettingMaps} />
                <Route path="users" component={SettingUsers} />
                <Route path="identities" component={SettingIdentity} />
                <Route path="credentials" component={SettingCredentials} />
                <Route path="templates" component={SettingTemplates} />
                <Route path="advanced" component={SettingAdvanced} />
            </Route>

            <Route path="device" component={Device}>
                <Route path="main" component={DeviceMain}>
                    <Route path="incidents" component={DeviceMainIncidents}/>
                    <Route path="rules" component={DeviceMainRules}/>
                    <Route path="rawIncidents" component={DeviceMainRawIncidents}/>
                    <Route path="advanced" component={DeviceMainAdvanced}/>
                    <Route path="ruleAdd" component={DeviceMainRuleAdd}/>
                </Route>
                <Route path="monitor" component={DeviceMonitors}/>
                <Route path="connected" component={DeviceConnected}/>
                <Route path="info" component={DeviceInfo}/>
            </Route>

        </Route>
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/signup" component={Signup} />
        <Route path="/devicelist" component={DeviceList} />
    </Router>
)

