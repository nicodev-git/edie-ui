import React from 'react'
import {Dialog} from 'material-ui'
import {Field} from 'redux-form'

import {FormInput, SubmitBlock} from 'components/modal/parts'

class PatternModalView extends React.Component {
  render () {
    const {onClickClose, onSubmit} = this.props
    return (
      <Dialog open title="Pattern">
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="text" component={FormInput} type="text" label="Pattern" multiLine/>
          </div>
          <SubmitBlock name="Save" onClick={onClickClose}/>
        </form>
      </Dialog>
    )
  }
}

export default PatternModalView
