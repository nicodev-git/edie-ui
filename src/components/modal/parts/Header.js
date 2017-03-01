import React from 'react'

const Header = ({name, onClick}) => (
  <div className="modal-header">
    <h4 className="modal-title bootstrap-dialog-title">{name}</h4>
    <div className="bootstrap-dialog-close-button">
      <button className="close" onClick={onClick}>×</button>
    </div>
  </div>
)

export default Header
