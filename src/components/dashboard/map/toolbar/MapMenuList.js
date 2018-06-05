import React from 'react'
import {IconButton} from '@material-ui/core'
import {Menu, MenuItem} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'

const buttonStyle = {
  padding: '4px',
  width: 40,
  height: 40
}

export default class MapMenuList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      anchorEl: null
    }
  }

  onClick(e) {
    this.setState({
      anchorEl: e.target,
      open: true
    })
  }
  onClose () {
    this.setState({
      open: false
    })
    return true
  }

  render () {
    const { onAdd, onRename, onDelete, onSave, onImport } = this.props
    return (
      <div className="inline-block">
        <IconButton style={buttonStyle} onClick={this.onClick.bind(this)}>
          <SettingsIcon nativeColor="#545454"/>
        </IconButton>
        <Menu open={this.state.open} anchorEl={this.state.anchorEl} onClose={this.onClose.bind(this)}>
          {onAdd && <MenuItem onClick={() => this.onClose() && onAdd()}>Add Map</MenuItem>}
          {onRename && <MenuItem onClick={() => this.onClose() && onRename()}>Rename Map</MenuItem>}
          {onDelete && <MenuItem onClick={() => this.onClose() && onDelete()}>Delete Map</MenuItem>}
          <MenuItem onClick={() => this.onClose() && onSave()}>Export Map</MenuItem>
          <MenuItem onClick={() => this.onClose() && onImport()}>Import Map</MenuItem>
        </Menu>
      </div>
    )
  }
}
