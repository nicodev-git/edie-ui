import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Popover, RadioButtonGroup, RadioButton } from 'material-ui'

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
          <div className="row">
            <div className="col-md-3">
              <RadioButtonGroup name="savetype" defaultSelected="new">
                <RadioButton value="new" label="New"/>
                <RadioButton value="replace" label="Replace"/>
              </RadioButtonGroup>
            </div>
            <div className="col-md-9">
              <Field name="name" component={FormInput} label="Name"/>
            </div>
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
