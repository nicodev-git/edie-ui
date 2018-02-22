import React from 'react'
import IconButton from 'material-ui/IconButton'
import Menu, {MenuItem} from 'material-ui/Menu'
import CreateIcon from 'material-ui/svg-icons/content/create'

const buttonStyle = {
  padding: '4px',
  width: 40,
  height: 40
}

const iconStyle = {
  width: 30,
  height: 30
}

class EditMapMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  onClick () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    const {onEdit, onUndo} = this.props
    return (
      <div className="inline-block">
        <IconButton style={buttonStyle} iconStyle={iconStyle} onClick={this.onClick.bind(this)}>
          <CreateIcon color="#545454"/>
        </IconButton>
        <Menu open={this.state.open}>
          <MenuItem onTouchTap={onEdit}>Edit</MenuItem>
          <MenuItem onTouchTap={onUndo}>Undo</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default EditMapMenu
