import React from 'react'
import { Field } from 'redux-form'
import { concat } from 'lodash'
import {FlatButton, SelectField, MenuItem} from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ToggleStar from 'material-ui/svg-icons/toggle/star-border'
import FilledStar from 'material-ui/svg-icons/toggle/star'

import { FormInput, FormSelect } from 'components/modal/parts'
import { underlineFocusStyle, inputStyle, selectedItemStyle } from 'style/materialStyles'

const emptySearch = {label: 'None', value: ''}
export default class
SearchFormView extends React.Component {
  render () {
    const { onSearchKeyDown,
      dateOptions,
      onClickStar,
      starFilled,
      onSubmit,
      searchOptions,
      onChangeSearchOption,
      onClickWorkflow,
      collections,
      selectedCollections,
      onChangeCollection
    } = this.props

    const options = dateOptions.map((m, index) => {
      return {
        label: m.name,
        value: index
      }
    })

    const savedSearchOptions = concat([], emptySearch, searchOptions)
    return (
      <form onSubmit={onSubmit}>
        <div className="text-center margin-md-top" >
          <Field name="query" component={FormInput} label="Search" onKeyDown={onSearchKeyDown} style={{verticalAlign: 'top'}}/>
          <Field name="dateIndex" component={FormSelect} label="" options={options} style={{verticalAlign: 'top', maxWidth: '200px'}}/>
          <SelectField
            underlineStyle={underlineFocusStyle}
            selectedMenuItemStyle={selectedItemStyle}
            menuItemStyle={inputStyle}
            multiple
            hintText="Collection"
            value={selectedCollections}
            onChange={onChangeCollection}
          >
            {collections.map(option =>
              <MenuItem
                key={option.value}
                insetChildren
                checked={selectedCollections && selectedCollections.includes(option.value)}
                value={option.value}
                primaryText={option.label}
              />
            )}
          </SelectField>
          <FlatButton label="Workflow" onTouchTap={onClickWorkflow} style={{marginTop: '4px', verticalAlign: 'top'}}/>
          <FlatButton type="submit" icon={<ActionSearch />} style={{marginTop: '4px', verticalAlign: 'top'}}/>
          <FlatButton icon={starFilled ? <FilledStar/> : <ToggleStar/>} style={{marginTop: '4px', verticalAlign: 'top'}} onClick={onClickStar}/>
          <Field name="searchOptionIndex" component={FormSelect} label="" options={savedSearchOptions} style={{verticalAlign: 'top', textAlign: 'left', maxWidth: '100px'}} onChange={onChangeSearchOption}/>
        </div>
      </form>
    )
  }
}
