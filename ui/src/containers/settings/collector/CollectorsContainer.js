import React from 'react'
import Collectors from 'components/sidebar/settings/collectors/Collectors'
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

class CollectorsContainer extends React.Component {
  render () {
    return (
      <Collectors {...this.props} />
    )
  }
}
export default connect(
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
)(withRouter(CollectorsContainer))

