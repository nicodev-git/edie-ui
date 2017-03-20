import React from 'react'
import { headerStyle } from '../../../style/materialStyles'

const Header = ({name, onClick}) => (
  <div className="modal-header" style={headerStyle}>
    <h4 className="modal-title">{name}</h4>
  </div>
)

export default Header
