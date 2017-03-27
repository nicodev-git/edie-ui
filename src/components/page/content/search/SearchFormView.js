import React from 'react'
import { Field } from 'redux-form'
import {FlatButton} from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'

import { FormInput, FormSelect } from 'components/modal/parts'

export default class SearchFormView extends React.Component {
  render () {
    const { onSearchKeyDown,
      dateOptions,
      onSubmit} = this.props

    const options = dateOptions.map((m, index) => {
      return {
        label: m.name,
        value: index
      }
    })
    return (
      <form onSubmit={onSubmit}>
        <div className="text-center margin-md-top" >
          <Field name="query" component={FormInput} label="Search" onKeyDown={onSearchKeyDown}/>
          <Field name="dateIndex" component={FormSelect} label="" options={options}/>
          <FlatButton type="submit" icon={<ActionSearch />} style={{marginTop: '4px', verticalAlign: 'top'}}/>
        </div>
      </form>
    )
  }
}
