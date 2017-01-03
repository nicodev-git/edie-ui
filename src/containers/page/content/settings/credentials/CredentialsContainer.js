import React from 'react'
import Credentials from '../../../../../components/page/content/settings/credentials/Credentials'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  fetchCredentials,
  openCredentialsModal,
  removeCredentials
} from '../../../../../actions'

@connect(
  state => ({
    credentials: state.settings.credentials,
    credentialsModalVisible: state.settings.credentialsModalVisible
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchCredentials,
      openCredentialsModal,
      removeCredentials
    }, dispatch)
  })
)
export default class CredentialsContainer extends React.Component {
  render () {
    return (
      <Credentials {...this.props} />
    )
  }
}
