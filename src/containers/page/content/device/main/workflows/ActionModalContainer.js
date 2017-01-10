import React from 'react'
import ActionModal from 'components/page/content/device/main/workflows/ActionModal'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  closeWfActionModal
} from 'actions'

@connect(
  state => ({
    editWfAction: state.devices.editWfAction,
    initialValues: state.devices.editWfAction
  }), {
    closeWfActionModal
  }
)
@withRouter
export default class ActionModalContainer extends React.Component {
  render () {
    return (
      <ActionModal {...this.props} />
    )
  }
}
