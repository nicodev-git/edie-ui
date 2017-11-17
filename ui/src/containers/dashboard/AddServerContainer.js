import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import AddServer from 'components/dashboard/main/AddServer'

import {
  fetchDeviceTemplates,
  fetchMonitorTemplates
} from 'actions'

class AddServerContainer extends React.Component {
  render () {
    return (
      <AddServer {...this.props}/>
    )
  }
}

export default connect(
  state => ({
    monitorTemplates: state.settings.monitorTemplates,
    deviceTemplates: state.settings.deviceTemplates
  }), {
    fetchDeviceTemplates,
    fetchMonitorTemplates
  }
)(withRouter(AddServerContainer))