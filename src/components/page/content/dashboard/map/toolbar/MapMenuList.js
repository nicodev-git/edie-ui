import React from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import SettingsIcon from 'material-ui/svg-icons/action/settings'

const buttonStyle = {
  padding: '4px',
  width: 50,
  height: 50
}

const iconStyle = {
  width: 30,
  height: 30
}

const MapMenuList = ({ onAdd, onRename, onDelete, onSave, onImport }) => (
  <IconMenu
    iconButtonElement={
      <IconButton style={buttonStyle} iconStyle={iconStyle}>
          <SettingsIcon color="#545454"/>
      </IconButton>
    }
    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
  >
    <MenuItem onTouchTap={onAdd}>Add Map</MenuItem>
    <MenuItem onTouchTap={onRename}>Rename Map</MenuItem>
    <MenuItem onTouchTap={onDelete}>Delete Map</MenuItem>
    <MenuItem onTouchTap={onSave}>Export Map</MenuItem>
    <MenuItem onTouchTap={onImport}>Import Map</MenuItem>
  </IconMenu>
)
/*  <ul className="nav nav-tabs" style={{background: 'transparent', display: 'inline-block'}}>
    <li className="dropdown">
      <a href="javascript:;" className="option p-none" onClick={onAdd}>
        <i className="fa fa-plus-square" title="Add Map" />
        <b className="caret" style={{position: 'absolute', left: '44%', top: '23px'}} />
      </a>
      <ul className="dropdown-menu">
        <li>
          <a href="javascript:;" className="option" onClick={onRename}>
            <i className="fa fa-edit margin-md-right" />Rename Map
          </a>
        </li>
        <li>
          <a href="javascript:;" className="option" onClick={onDelete}>
            <i className="fa fa-trash-o margin-md-right" />Delete Map
          </a>
        </li>
        <li>
          <a href="javascript:;" className="option" onClick={onSave}>
            <i className="fa fa-save margin-md-right" />Export Map
          </a>
        </li>
        <li>
          <a href="javascript:;" className="option" onClick={onImport}>
            <i className="fa fa-upload margin-md-right" />Import Map
          </a>
        </li>
      </ul>
    </li>
  </ul>
) */

export default MapMenuList
