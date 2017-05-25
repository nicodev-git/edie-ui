import React from 'react'
import CommentsModal from 'components/shared/incident/CommentsModal'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default class CommentsModalContainer extends React.Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }
  getChildContext () {
    return {
      muiTheme: getMuiTheme()
    }
  }
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
