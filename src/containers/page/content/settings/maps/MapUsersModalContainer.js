import React from 'react'
import MapUsersModal from '../../../../../components/page/content/settings/maps/MapUsersModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeMapUsersModal, addMapUser, removeMapUser } from '../../../../../actions'

@connect(
  state => ({
    editMap: state.settings.editMap,
    mapUsers: state.settings.mapUsers
  }),
  dispatch => ({
    ...bindActionCreators({
      closeMapUsersModal,
      addMapUser,
      removeMapUser
    }, dispatch)
  })
)
export default class MapUsersModalContainer extends React.Component { // eslint-disable-line react/no-multi-comp
  render () {
    return (
      <MapUsersModal {...this.props} />
    )
  }
}
