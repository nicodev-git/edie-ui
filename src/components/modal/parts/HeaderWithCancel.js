import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { headerStyle, buttonStyle, buttonTextStyle } from '../../../style/materialStyles'

const HeaderWithCancel = ({name, onClose}) => (
  <div className="modal-header header-with-cancel" style={headerStyle}>
    <h4 className="modal-title">{name}</h4>
    <FlatButton label="Cancel" onClick={onClose} style={buttonStyle} labelStyle={buttonTextStyle}/>
  </div>
)

export default HeaderWithCancel
