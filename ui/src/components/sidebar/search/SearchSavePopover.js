import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Popover, RadioGroup, Radio } from '@material-ui/core'

import { FormInput, FormSelect, SubmitBlock } from 'components/modal/parts'

import SavedSearchModal from './SavedSearchModal'

class SearchSavePopover extends React.Component {
  renderExisting () {
    return <SavedSearchModal {...this.props} panelMode/>
  }
  renderContent () {
    const {searchSaveType, onRequestClose, userOptions} = this.props
    switch(searchSaveType) {
      case 'new':
        return (
          <div>
            <Field name="name" component={FormInput} label="Name"/>
            <SubmitBlock name="Save" onClick={onRequestClose}/>
          </div>
        )
      case 'replace':
        return (
          <div>
            <Field name="searchId" component={FormSelect} label="Existing" options={userOptions.map(p => ({label: p.name, value: p.id}))}/>
            <SubmitBlock name="Save" onClick={onRequestClose}/>
          </div>
        )
      default:
        return this.renderExisting()
    }
  }
  render () {
    const { anchorEl, onRequestClose, onSubmit, handleSubmit, changeSearchSaveType } = this.props
    return (
      <Popover
        open
        anchorEl={anchorEl}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        onClose={onRequestClose}
        className="padding-md"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <RadioGroup name="saveType" defaultSelected="new" onChange={(e, value) => changeSearchSaveType(value)}>
              <Radio value="new" label="New" style={{display: 'inline-block', width: 'auto'}}/>
              <Radio value="replace" label="Replace" style={{display: 'inline-block', width: 'auto', marginLeft: 20}}/>
              <Radio value="existing" label="Existing" style={{display: 'inline-block', width: 'auto', marginLeft: 20}}/>
            </RadioGroup>
          </div>
          {this.renderContent()}
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
