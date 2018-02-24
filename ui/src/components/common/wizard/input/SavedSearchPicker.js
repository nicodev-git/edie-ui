import React from 'react'
import {Checkbox} from 'material-ui'

export default class SavedSearchPicker extends React.Component {
  render () {
    const {searchList, selectedSearchIds, onClickToggleSearch} = this.props
    return (
      <div style={{maxHeight: 300, overflow: 'auto'}}>
        {searchList.map(p =>
          <div key={p.value || p.id}>
            <Checkbox
              label={p.label || p.name} onChange={() => onClickToggleSearch(p.value || p.id)}
              checked={selectedSearchIds.includes(p.value || p.id)}
            />
          </div>
        )}
      </div>
    )
  }
}
