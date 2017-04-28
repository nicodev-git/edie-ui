import React from 'react'
import Apps from 'components/page/content/device/monitors/ApplicationTable'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  fetchDeviceApps,

  updateSearchParams,
  replaceSearchWfs,
  updateQueryChips
} from 'actions'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,

    apps: state.devices.apps,

    params: state.search.params
  }),
  {
    fetchDeviceApps,

    updateSearchParams,
    replaceSearchWfs,
    updateQueryChips
  }
)
@withRouter
export default class AppsContainer extends React.Component {
  render () {
    return (
      <Apps {...this.props}/>
    )
  }
}
