import React from 'react'
import Topbar from '../../../components/page/topbar/Topbar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { appendComponent, removeComponent } from '../../../util/Component'
import { signOut, openProfileModal, closeProfileModal } from '../../../actions'

class TopbarContainer extends React.Component {
  render () {
    return (
      <Topbar {...this.props} />
    )
  }
}

export default connect(
  state => ({
    user: state.dashboard.userInfo || {},
    profileModalVisible: state.dashboard.profileModalVisible
  }),
  dispatch => ({
    ...bindActionCreators({
      signOut,
      openProfileModal,
      closeProfileModal,
      appendComponent,
      removeComponent
    }, dispatch)
  })
)(TopbarContainer)
