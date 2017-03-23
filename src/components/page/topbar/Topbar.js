import React from 'react'
import TopbarComponent from './TopbarComponent'

export default class Topbar extends React.Component {

  onClickProfile () {
    this.props.openProfileModal()
  }

  onClickMessages () {
    console.log('messages clicked')
  }

  onClickSearch (value) {
    console.log('making a request... ', value)
  }

  render () {
    const {user} = this.props
    return (
      <TopbarComponent
        user={user}
        onSearch={this.onClickSearch.bind(this)}
        paused={this.context.paused}
        onClickProfile={this.onClickProfile.bind(this)}
        onClickMessages={this.onClickMessages.bind(this)}
        onSignOut={this.props.signOut}
      />
    )
  }
}
