import React from 'react'
import {Checkbox} from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'

export default class SavedSearchPicker extends React.Component {
  render () {
    const {searchList, selectedSearchIds, onClickToggleSearch} = this.props
    return (
      <div style={{maxHeight: 300, overflow: 'auto'}}>
        {searchList.map(p =>
          <div key={p.value || p.id}>
            <FormControlLabel
              control={
                <Checkbox onChange={() => onClickToggleSearch(p.value || p.id)} checked={selectedSearchIds.includes(p.value || p.id)}/>
              }
              label={p.label || p.name}
            />
          </div>
        )}
      </div>
    )
  }
}
