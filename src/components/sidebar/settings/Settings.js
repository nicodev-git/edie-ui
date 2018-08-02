import React from 'react'
import { Switch, withRouter } from 'react-router'
import { Route } from 'react-router-dom'

import SettingGeneralContainer from 'containers/settings/general/GeneralContainer'
import SettingMapsContainer from 'containers/settings/maps/MapsContainer'
import SettingIdentitiesContainer from 'containers/settings/identity/IdentitiesContainer'
import SettingAdvancedContainer from 'containers/settings/advanced/AdvancedContainer'
import SettingAudit from 'containers/settings/audit/AuditContainer'
import SettingTags from 'components/sidebar/settings/tag/TagRoutes'
import SettingUsers from 'components/sidebar/settings/users/UserRoutes'
// import SettingCollectors from 'components/sidebar/settings/collector/CollectorRoutes'
// import SettingFlowGroupsContainer from 'containers/settings/flowgroups/FlowgroupsContainer'
// import SettingGlobalvarsContainer from 'containers/settings/globalvar/GlobalvarsContainer'
import SettingConnectorsContainer from 'containers/settings/connector/ConnectorsContainer'
import SettingBraincellsContainer from 'containers/settings/braincell/BraincellsContainer'


class Settings extends React.Component {
  render () {
    return (
      <Switch>
        <Route path="/settings" exact component={SettingGeneralContainer} />
        {/*<Route path="/settings/collectors" component={SettingCollectors} />*/}
        <Route path="/settings/tags" component={SettingTags}/>
        <Route path="/settings/maps" component={SettingMapsContainer} />
        <Route path="/settings/users" component={SettingUsers}/>
        <Route path="/settings/identities" component={SettingIdentitiesContainer} />
        <Route path="/settings/audit" component={SettingAudit} />
        <Route path="/settings/advanced" component={SettingAdvancedContainer} />
        {/*<Route path="/settings/flowgroups" component={SettingFlowGroupsContainer} />*/}
        {/*<Route path="/settings/globalvars" component={SettingGlobalvarsContainer} />*/}
        <Route path="/settings/connectors" component={SettingConnectorsContainer} />
        <Route path="/settings/braincells" component={SettingBraincellsContainer} />
      </Switch>
    )
  }
}
export default withRouter(Settings)
