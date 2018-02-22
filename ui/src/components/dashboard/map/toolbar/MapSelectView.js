import React from 'react'
import IconButton from 'material-ui/IconButton'
import Menu, {MenuItem} from 'material-ui/Menu'
import ChromeReaderModeIcon from 'material-ui-icons/ChromeReaderMode'

const buttonStyle = {
  padding: '4px',
  width: 40,
  height: 40
}

const iconStyle = {
  width: 30,
  height: 30
}

const MapSelectView = ({ onChange, maps }) => (
  <div className="inline-block">
    <IconButton style={buttonStyle} iconStyle={iconStyle}>
      <ChromeReaderModeIcon color="#545454"/>
    </IconButton>
    <Menu open={false}>
      {
        maps.map(map =>
          <MenuItem value={map.id} key={map.id}>
            {map.name}
          </MenuItem>
        )
      }
    </Menu>
  </div>
)

export default MapSelectView
