import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import {Menu, MenuItem} from '@material-ui/core'
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode'

const buttonStyle = {
  padding: '4px',
  width: 40,
  height: 40
}

// const iconStyle = {
//   width: 30,
//   height: 30
// }
export default class MapSelectView extends React.Component {
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
    const { maps } = this.props
    return (
      <div className="inline-block">
        <IconButton style={buttonStyle} onClick={this.onClick.bind(this)}>
          <ChromeReaderModeIcon nativeColor="#545454"/>
        </IconButton>
        <Menu open={this.state.open} anchorEl={this.state.anchorEl} onClose={this.onClose.bind(this)}>
          {
            maps.map(map =>
              <MenuItem value={map.id} key={map.id} onClick={() => this.onChange(map)}>
                {map.name}
              </MenuItem>
            )
          }
        </Menu>
      </div>
    )
  }
}
