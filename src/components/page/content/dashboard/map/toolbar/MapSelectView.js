import React from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

const MapSelectView = ({ selectedMap, onChange, maps }) => (
  <IconMenu
    iconButtonElement={
      <IconButton style={buttonStyle} iconStyle={iconStyle}>
          <AccoutCircleIcon color="#777777"/>
      </IconButton>
    }
    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
  >
    <MenuItem primaryText="Profile" onTouchTap={onClickProfile}/>
    <MenuItem primaryText="Messages" onTouchTap={onClickMessages}/>
    <Divider />
    <MenuItem primaryText="Log out" onTouchTap={onSignOut}/>
  </IconMenu>
)

/* const MapSelectView = ({ selectedMap, onChange, maps }) => (
  <select
    className="input-sm map-select margin-sm-left"
    style={{marginTop: '-9px'}}
    value={selectedMap ? selectedMap.id : ''}
    onChange={onChange}>
    {
      maps.map(map =>
        <option value={map.id} key={map.id}>
          {map.name}
        </option>
      )
    }
  </select>
) */

export default MapSelectView
