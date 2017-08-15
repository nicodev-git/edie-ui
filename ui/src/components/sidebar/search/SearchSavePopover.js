import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Popover, RadioButtonGroup, RadioButton } from 'material-ui'

import { FormInput, FormSelect, SubmitBlock } from 'components/modal/parts'

class SearchSavePopover extends React.Component {
  renderContent () {
    const {searchSaveType} = this.props
    switch(searchSaveType) {
      case 'new':
        return (
          <div>
            <Field name="name" component={FormInput} label="Name"/>
            <SubmitBlock name="Done" onClick={onRequestClose}/>
          </div>
        )
      case 'repalce':
        return (
          <div>
            <Field name="searchId" component={FormSelect} label="Existing" options={userOptions.map(p => ({label: p.name, value: p.id}))}/>
            <SubmitBlock name="Done" onClick={onRequestClose}/>
          </div>
        )
    }
  }
  render () {
    const { anchorEl, onRequestClose, onSubmit, handleSubmit, userOptions, searchSaveType, changeSearchSaveType } = this.props
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
            <RadioButtonGroup name="saveType" defaultSelected="new" onChange={(e, value) => changeSearchSaveType(value)}>
              <RadioButton value="new" label="New" style={{display: 'inline-block', width: 'auto'}}/>
              <RadioButton value="replace" label="Replace" style={{display: 'inline-block', width: 'auto', marginLeft: 20}}/>
              <RadioButton value="existing" label="Existing" style={{display: 'inline-block', width: 'auto', marginLeft: 20}}/>
            </RadioButtonGroup>
          </div>
          <div>
            {searchSaveType === 'new' ? (
              <Field name="name" component={FormInput} label="Name"/>
            ) : (
              <Field name="searchId" component={FormSelect} label="Existing" options={userOptions.map(p => ({label: p.name, value: p.id}))}/>
            )}

            <SubmitBlock name="Done" onClick={onRequestClose}/>
          </div>
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
