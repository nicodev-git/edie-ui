import React from 'react'
import IconButton from 'material-ui/IconButton'
import Menu, {MenuItem} from 'material-ui/Menu'
import SettingsIcon from 'material-ui-icons/Settings'

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
  }

  onChange (map) {
    this.onClose()
    this.props.onChange(map)
  }
  render () {
    const { onAdd, onRename, onDelete, onSave, onImport } = this.props
    return (
      <div className="inline-block">
        <IconButton style={buttonStyle} onClick={this.onClick.bind(this)}>
          <SettingsIcon nativeColor="#545454"/>
        </IconButton>
        <Menu open={this.state.open} anchorEl={this.state.anchorEl} onClose={this.onClose.bind(this)}>
          {onAdd && <MenuItem onTouchTap={onAdd}>Add Map</MenuItem>}
          {onRename && <MenuItem onTouchTap={onRename}>Rename Map</MenuItem>}
          {onDelete && <MenuItem onTouchTap={onDelete}>Delete Map</MenuItem>}
          <MenuItem onTouchTap={onSave}>Export Map</MenuItem>
          <MenuItem onTouchTap={onImport}>Import Map</MenuItem>
        </Menu>
      </div>
    )
  }
}
