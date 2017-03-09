import React from 'react'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'

const style = {
  width: '100%'
}

const Message = ({avatar, name, message, time}) => (
  <Chip style={style}>
    <Avatar src={avatar} />
    <div className="message-body">
      <strong>{name}</strong><br/>{message}<br/>
      <small className="text-muted">{time}</small>
    </div>
  </Chip>
)

export default Message
