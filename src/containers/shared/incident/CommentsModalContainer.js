import React from 'react'
import CommentsModal from '../../../components/shared/incident/CommentsModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateDeviceIncident } from '../../../actions'

@connect(
  state => ({ }),
  dispatch => ({
    updateDeviceIncident: bindActionCreators(updateDeviceIncident, dispatch)
  })
)
export default class CommentsModalContainer extends React.Component {
  render () {
    return (
      <CommentsModal {...this.props} />
    )
  }
}

CommentsModal.defaultProps = {
  onClose: null,
  incident: {}
}
