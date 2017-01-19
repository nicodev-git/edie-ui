import React from 'react'
import Maps from '../../../../../components/page/content/settings/maps/Maps'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  fetchSettingMaps,
  openSettingMapModal,
  deleteSettingMap,
  openMapUsersModal,

  addSettingMap,
  updateSettingMap,
  closeSettingMapModal,

  closeMapUsersModal,
  addMapUser,
  removeMapUser
} from '../../../../../actions'

@connect(
  state => ({
    maps: state.settings.maps,
    mapModalVisible: state.settings.mapModalVisible,
    mapUsersModalVisible: state.settings.mapUsersModalVisible,

    editMap: state.settings.editMap,

    mapUsers: state.settings.mapUsers
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchSettingMaps,
      openSettingMapModal,
      deleteSettingMap,
      openMapUsersModal,

      addSettingMap,
      updateSettingMap,
      closeSettingMapModal,

      closeMapUsersModal,
      addMapUser,
      removeMapUser
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
