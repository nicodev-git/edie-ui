import React from 'react'
import Avatar from 'material-ui/Avatar'

const Message = ({avatar, name, message, time}) => (
  <div className="topbar-message">
    <div><Avatar src={avatar} /></div>
    <div>
      <div><strong>{name}</strong></div>
      <div>{message}</div>
    </div>
    <div><small className="text-muted">{time}</small></div>
  </div>
)

export default Message
