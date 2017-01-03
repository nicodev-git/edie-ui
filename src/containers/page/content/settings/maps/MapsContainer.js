import React from 'react'
import Maps from '../../../../../components/page/content/settings/maps/Maps'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  fetchSettingMaps,
  openSettingMapModal,
  deleteSettingMap,
  openMapUsersModal
} from '../../../../../actions'

@connect(
  state => ({
    maps: state.settings.maps,
    mapModalVisible: state.settings.mapModalVisible,
    mapUsersModalVisible: state.settings.mapUsersModalVisible
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchSettingMaps,
      openSettingMapModal,
      deleteSettingMap,
      openMapUsersModal
    }, dispatch)
  })
)
export default class MapsContainer extends React.Component {
  render () {
    return (
      <Maps {...this.props} />
    )
  }
}
