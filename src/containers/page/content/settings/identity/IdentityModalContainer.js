import React from 'react'
import IdentityModal from '../../../../../components/page/content/settings/identity/IdentityModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeIdentityModal, addIdentity, updateIdentity } from '../../../../../actions'

@connect(
  state => ({
    editIdentity: state.settings.editIdentity,
    initialValues: (state.settings.editIdentity || {}).identities
  }),
  dispatch => ({
    ...bindActionCreators({
      closeIdentityModal,
      addIdentity,
      updateIdentity
    }, dispatch)
  })
)
export default class IdentityModalContainer extends React.Component {
  render () {
    return (
      <IdentityModal {...this.props} />
    )
  }
}
