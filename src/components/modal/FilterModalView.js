import React from 'react'
import {Dialog} from 'material-ui'
import {Field} from 'redux-form'

import {FormInput, SubmitBlock} from './parts'

class FilterModalView extends React.Component {
  render () {
    const {onClickClose, onSubmit} = this.props
    return (
      <Dialog open title="Filter">
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="text" component={FormInput} type="text" label="Filter"/>
          </div>
          <SubmitBlock name="Save" onClick={onClickClose}/>
        </form>
      </Dialog>
    )
  }
}

export default FilterModalView
