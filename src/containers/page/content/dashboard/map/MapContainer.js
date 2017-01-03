import React from 'react'
import Map from '../../../../../components/page/content/dashboard/map/Map'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { ROOT_URL } from '../../../../../actions/config'

import {
  openDevice,
  addMapDevice,
  deleteMapDevice,
  updateMapDevice,
  addMapLine,
  deleteMapLine,
  updateMapLine
} from '../../../../../actions'

@connect(
  state => ({
    mapDevices: state.dashboard.mapDevices,
    mapLines: state.dashboard.mapLines,
    selectedMap: state.dashboard.selectedMap,
    showTraffic: state.settings.showTraffic,
    ROOT_URL
  }),
  dispatch => ({
    ...bindActionCreators({
      openDevice,
      addMapDevice,
      deleteMapDevice,
      updateMapDevice,
      addMapLine,
      deleteMapLine,
      updateMapLine
    }, dispatch)
  })
)
@withRouter
export default class MapContainer extends React.Component {
  render () {
    return (
      <Map {...this.props} />
    )
  }
}
