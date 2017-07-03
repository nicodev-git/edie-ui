import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Popover, RadioButton } from 'material-ui'

import { FormInput, SubmitBlock } from 'components/modal/parts'

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
          <RadioButtonGroup name="shipName" defaultSelected="community">
          <div>
            <div>
              <RadioButton value="new" label="New"/>
            </div>
            <Field name="name" component={FormInput} label="Name"/>
          </div>
          <div>
            <div>
              <RadioButton value="replace" label="Replace"/>
            </div>
            <div>
              &nbsp;
            </div>
          </div>
          </RadioButtonGroup>
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
