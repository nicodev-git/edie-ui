import React from 'react'
import Messages from './Messages'

const MessageBox = () => (
  <li className="dropdown">
    <a data-toggle="dropdown" className="dropdown-toggle" href="javascript:;">
      <i className="glyphicon glyphicon-envelope" style={{padding: '2px'}} />
      <span className="badge badge-up badge-dark badge-small">3</span>
    </a>
    <Messages />
  </li>
)

export default MessageBox
