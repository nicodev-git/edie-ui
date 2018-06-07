import React from 'react'
import CommentsModal from 'components/common/incident/CommentsModal'

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
