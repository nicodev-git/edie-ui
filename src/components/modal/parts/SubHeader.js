import React from 'react'
import Subheader from 'material-ui/Subheader'
import { subHeaderStyle } from './materialStyles'

const SubHeader = ({name}) => (
  <div className="modal-header" style={headerStyle}>
    <h4 className="modal-title bootstrap-dialog-title">{name}</h4>
    <div className="bootstrap-dialog-close-button">
      <button className="close" onClick={onClick}>×</button>
    </div>
  </div>
)

export default SubHeader
