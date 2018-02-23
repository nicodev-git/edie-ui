import React from 'react'
import IconButton from 'material-ui/IconButton'
import Menu, {MenuItem} from 'material-ui/Menu'
import CreateIcon from 'material-ui-icons/Create'

const buttonStyle = {
  padding: '4px',
  width: 40,
  height: 40
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
        <IconButton style={buttonStyle}  onClick={this.onClick.bind(this)}>
          <CreateIcon nativeColor="#545454"/>
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
