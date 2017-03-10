import React from 'react'

const MapMenuList = ({ onAdd, onRename, onDelete, onSave, onImport }) => (
  <ul className="nav nav-tabs" style={{background: 'transparent', display: 'inline-block'}}>
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
)

export default MapMenuList
