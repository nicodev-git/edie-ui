import React from 'react'

const MapSelectView = ({ selectedMap, onChange, maps }) => (
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
)

export default MapSelectView
