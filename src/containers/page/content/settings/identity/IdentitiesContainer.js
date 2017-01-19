import React, { Component } from 'react'
import Identities from '../../../../../components/page/content/settings/identity/Identities'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  fetchIdentities,
  openIdentityModal,
  removeIdentity,

  closeIdentityModal,
  addIdentity,
  updateIdentity
} from '../../../../../actions'

@connect(
  state => ({
    identities: state.settings.identities,
    editIdentity: state.settings.editIdentity,
    identityModalVisible: state.settings.identityModalVisible
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchIdentities,
      openIdentityModal,
      removeIdentity,

      closeIdentityModal,
      addIdentity,
      updateIdentity
    }, dispatch)
  })
)
export default class IdentitiesContainer extends Component {
  render () {
    return (
      <Identities {...this.props} />
    )
  }
}
