import React from 'react'
import CredentialModal from '../../../../../components/page/content/settings/credentials/CredentialModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  fetchCredentials,
  addCredentials,
  updateCredentials,
  closeCredentialsModal
} from '../../../../../actions'

@connect(
  state => ({
    editCredentials: state.settings.editCredentials,
    initialValues: state.settings.editCredentials
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchCredentials,
      addCredentials,
      updateCredentials,
      closeCredentialsModal
    }, dispatch)
  })
)
export default class CredentialModalContainer extends React.Component {
  render () {
    return (
      <CredentialModal {...this.props} />
    )
  }
}

CredentialModal.defaultProps = {
  credentials: null
}
