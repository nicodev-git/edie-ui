import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import {Menu, MenuItem} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'

const buttonStyle = {
  padding: '4px',
  width: 40,
  height: 40
}

class EditMapMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      anchorEl: null
    }
  }

  onClick (e) {
    this.setState({
      open: true,
      anchorEl: e.target
    })
  }

  onClose () {
    this.setState({
      open: false
    })
    return true
  }


  render () {
    const {onEdit, onUndo} = this.props
    return (
      <div className="inline-block">
        <IconButton style={buttonStyle}  onClick={this.onClick.bind(this)}>
          <CreateIcon nativeColor="#545454"/>
        </IconButton>
        <Menu open={this.state.open}
              anchorEl={this.state.anchorEl}
              onClose={this.onClose.bind(this)}>
          <MenuItem onClick={() => this.onClose() && onEdit()}>Edit</MenuItem>
          <MenuItem onClick={() => this.onClose() && onUndo()}>Undo</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default EditMapMenu
