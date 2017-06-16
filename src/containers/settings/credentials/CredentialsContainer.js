import React from 'react'
import Credentials from 'components/sidebar/settings/credentials/Credentials'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import {
  fetchCredentials,
  openCredentialsModal,
  removeCredentials,

  addCredentials,
  updateCredentials,
  closeCredentialsModal
} from 'actions'

@connect(
  state => ({
    credentials: state.settings.credentials,
    credentialsModalVisible: state.settings.credentialsModalVisible,

    editCredentials: state.settings.editCredentials
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchCredentials,
      openCredentialsModal,
      removeCredentials,

      addCredentials,
      updateCredentials,
      closeCredentialsModal
    }, dispatch)
  })
)
@withRouter
export default class CredentialsContainer extends React.Component {
  render () {
    return (
      <Credentials {...this.props} />
    )
  }
}
