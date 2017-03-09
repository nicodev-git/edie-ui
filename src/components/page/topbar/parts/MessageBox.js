import React from 'react'
import Messages from './Messages'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import MailOutlineIcon from 'material-ui/svg-icons/communication/mail-outline'

const MessageBox = () => (
  <li className="dropdown">
    <Badge
      badgeContent={4}
      primary
      >
        <IconButton tooltip={<Messages/>}>
          <MailOutlineIcon />
        </IconButton>
    </Badge>
  </li>
)

export default MessageBox

/* <li className="dropdown">
  <a data-toggle="dropdown" className="dropdown-toggle" href="javascript:;">
    <i className="glyphicon glyphicon-envelope" style={{padding: '2px'}} />
    <span className="badge badge-up badge-dark badge-small">3</span>
  </a>
  <Messages />
</li> */
