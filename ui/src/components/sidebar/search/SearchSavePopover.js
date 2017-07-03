import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Popover, RadioButtonGroup, RadioButton, SelectField, MenuItem } from 'material-ui'

import { FormInput, FormSelect, SubmitBlock } from 'components/modal/parts'

class SearchSavePopover extends React.Component {
  render () {
    const { anchorEl, onRequestClose, onSubmit, handleSubmit } = this.props
    return (
      <Popover
        open
        anchorEl={anchorEl}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        onRequestClose={onRequestClose}
        className="padding-md"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <RadioButtonGroup name="saveType" defaultSelected="new">
              <RadioButton value="new" label="New" style={{display: 'inline-block', width: 'auto'}}/>
              <RadioButton value="replace" label="Replace" style={{display: 'inline-block', width: 'auto', marginLeft: 20}}/>
            </RadioButtonGroup>
          </div>
          <div>
            <Field name="name" component={FormInput} label="Name"/>
            <Field name="severity" component={FormSelect} label="Severity" options={userSearches}/>
          </div>

          <SubmitBlock name="Done" onClick={onRequestClose}/>
        </form>
      </Popover>
    )
  }
}

export default connect(
  state => ({
    initialValues: {}
  })
)(reduxForm({form: 'searchSaveForm'})(SearchSavePopover))
