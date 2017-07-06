import React from 'react'
import CredPicker from 'components/sidebar/settings/credentials/CredPicker'
import { connect } from 'react-redux'

import {
  fetchCredentials
} from 'actions'

class CredsPickerContainer extends React.Component {
  render () {
    return (
      <CredPicker {...this.props} />
    )
  }
}
export default connect(
  state => ({
    credentials: state.settings.credentials
  }), {
    fetchCredentials
  }
)(CredsPickerContainer)
