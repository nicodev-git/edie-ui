import React, { Component } from 'react'
import Chat from 'components/page/content/chat/Chat'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import {
  loadIncidents,
  loadIncidentUsers,
  uploadChatImage,
  setIncidents,
  setRoomUsers,
  setRooms,
  selectIncident
} from 'actions'

@connect(
  state => ({
    incidents: state.chat.incidents,
    rooms: state.chat.rooms,
    image: state.chat.image,
    roomUsers: state.chat.roomUsers,
    selected: state.chat.selected
  }),
  dispatch => ({
    ...bindActionCreators({
      loadIncidents,
      loadIncidentUsers,
      uploadChatImage,
      setIncidents,
      setRoomUsers,
      setRooms,
      selectIncident
    }, dispatch)
  })
)
@withRouter
export default class ChatContainer extends Component {
  render () {
    return (
      <Chat {...this.props} />
    )
  }
}
