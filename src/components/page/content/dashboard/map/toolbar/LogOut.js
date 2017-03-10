import React from 'react'

const LogOut = () => (
  <li className="dropdown dropdown-settings">
    <a href="javascript:;" className="option p-none"><i className="fa fa-cog" title="Add" />
      <b className="caret" style ={{position: 'absolute', left: '48%', top: '23px'}} />
    </a>
    <ul className="dropdown-menu drop-right">
      <li>
        <a href="javascript:logout();"
          className="option"> <i className="fa fa-sign-out margin-md-right" />Log Out
        </a>
      </li>
    </ul>
  </li>
)

export default LogOut
