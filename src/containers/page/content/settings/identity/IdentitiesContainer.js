import React, { Component } from 'react'
import Identities from '../../../../../components/page/content/settings/identity/Identities'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchIdentities, openIdentityModal, removeIdentity } from '../../../../../actions'

@connect(
  state => ({
    identities: state.settings.identities,
    identityModalVisible: state.settings.identityModalVisible
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchIdentities,
      openIdentityModal,
      removeIdentity
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
