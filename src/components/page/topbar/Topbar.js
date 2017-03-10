import React from 'react'
import ProfileModal from './ProfileModal'
import TopbarComponent from './TopbarComponent'

export default class Topbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profileModalVisible: false
    }
  }

  renderProfileModal () {
    if (!this.props.profileModalVisible) return

    return (
      <ProfileModal {...this.props} />
    )
  }

  onClickProfile () {
    this.props.openProfileModal()
  }

  onClickMessages () {
    console.log('messages clicked')
  }

  onClickSearch (e) {
    console.log('searchig for... ', e)
  }

  render () {
    const {user} = this.props
    return (
      <TopbarComponent
        user={user}
        profile={this.renderProfileModal()}
        onSearch={this.onClickSearch.bind(this)}
        paused={this.context.paused}
        onClickProfile={this.onClickProfile.bind(this)}
        onClickMessages={this.onClickMessages.bind(this)}
        onSignOut={this.props.signOut}
      />
    )
  }
}
