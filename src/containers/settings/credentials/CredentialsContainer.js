import React from 'react'
import Credentials from 'components/sidebar/settings/credentials/Credentials'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import {
  fetchCredentials,
  openCredentialsModal,
  removeCredentials,
  fetchDevicesGroups,

  fetchCredTypes,
  addCredentials,
  updateCredentials,
  closeCredentialsModal
} from 'actions'

class CredentialsContainer extends React.Component {
  render () {
    return (
      <Credentials {...this.props} />
    )
  }
}
export default connect(
  state => ({
    credentials: state.settings.credentials,
    credentialsModalVisible: state.settings.credentialsModalVisible,
    credentialDraw: state.settings.credentialDraw,

    editCredentials: state.settings.editCredentials,

    credentialTypes: state.settings.credentialTypes,

    devices: state.devices.deviceAndGroups,

    userInfo: state.dashboard.userInfo
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchCredentials,
      openCredentialsModal,
      removeCredentials,
      fetchDevicesGroups,

      fetchCredTypes,
      addCredentials,
      updateCredentials,
      closeCredentialsModal
    }, dispatch)
  })
)(withRouter(CredentialsContainer))
