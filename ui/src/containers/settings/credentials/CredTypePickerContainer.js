import React from 'react'
import CredTypePicker from 'components/sidebar/settings/credentials/CredTypePicker'
import { connect } from 'react-redux'

import {
  fetchCredTypes,
  selectCredType
} from 'actions'

class CredTypePickerContainer extends React.Component {
  render () {
    return (
      <CredTypePicker {...this.props} />
    )
  }
}
export default connect(
  state => ({
    credentialTypes: state.setting.credentialTypes,
    selectedCredType: state.setting.selectedCredType
  }), {
    fetchCredTypes,
    selectCredType
  }
)(CredTypePickerContainer)
