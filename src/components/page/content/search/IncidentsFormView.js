import React from 'react'
import { Field } from 'redux-form'
import { concat } from 'lodash'
import {FlatButton, SelectField, MenuItem} from 'material-ui'

import { FormInput, FormSelect } from 'components/modal/parts'
import { underlineFocusStyle, inputStyle, selectedItemStyle } from 'style/materialStyles'

class IncidentsFormView extends React.Component {
  render () {
    const {
      onSubmit,
      searchOptions,
      onChangeSearchOption,
      onClickWorkflow,
      collections,
      selectedSeverities,
      onChangeSeverity
    } = this.props

    const savedSearchOptions = concat([], emptySearch, searchOptions)
    return (
      <form onSubmit={onSubmit}>
        <div className="text-center margin-md-top" >
          <SelectField
            underlineStyle={underlineFocusStyle}
            selectedMenuItemStyle={selectedItemStyle}
            menuItemStyle={inputStyle}
            multiple
            hintText="Collection"
            value={selectedSeverities}
            onChange={onChangeSeverity}
          >
            {collections.map(option =>
              <MenuItem
                key={option.value}
                insetChildren
                checked={selectedSeverities && selectedSeverities.includes(option.value)}
                value={option.value}
                primaryText={option.label}
              />
            )}
          </SelectField>
          <FlatButton label="Workflow" onTouchTap={onClickWorkflow} style={{marginTop: '4px', verticalAlign: 'top'}}/>
          <Field name="searchOptionIndex" component={FormSelect} label="" options={savedSearchOptions} style={{verticalAlign: 'top', textAlign: 'left', maxWidth: '100px'}} onChange={onChangeSearchOption}/>
        </div>
      </form>
    )
  }
}

export default IncidentsFormView