import React from 'react'
import {Checkbox} from 'material-ui'

export default class SavedSearchPicker extends React.Component {
  render () {
    const {searchList, selectedSearchIds, onClickToggleSearch} = this.props
    return (
      <div style={{maxHeight: 300, overflow: 'auto'}}>
        {searchList.map(p =>
          <div key={p.value}>
            <Checkbox
              label={p.label} onCheck={() => onClickToggleSearch(p.value)}
              checked={selectedSearchIds.includes(p.value)}
            />
          </div>
        )}
      </div>
    )
  }
}
