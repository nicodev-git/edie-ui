import React from 'react'
import {Checkbox} from 'material-ui'

export default class SavedSearchPicker extends React.Component {
  render () {
    const {searchList, selectedSearchIds, onClickToggleSearch} = this.props
    return (
      <div>
        {searchList.map(p =>
          <div key={p.id}>
            <Checkbox
              label={p.name} onCheck={() => onClickToggleSearch(p)}
              checked={selectedSearchIds.includes(p.id)}
            />
          </div>
        )}
      </div>
    )
  }
}
