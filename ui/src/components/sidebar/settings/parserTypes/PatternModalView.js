import React from 'react'
import {Field} from 'redux-form'

import {FormInput, SubmitBlock, Modal} from 'components/modal/parts'

class PatternModalView extends React.Component {
  render () {
    const {onClickClose, onSubmit} = this.props
    return (
      <Modal title="Pattern" onRequestClose={onClickClose}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="text" component={FormInput} type="text" label="Pattern" multiLine/>
          </div>
          <SubmitBlock name="Save" onClick={onClickClose}/>
        </form>
      </Modal>
    )
  }
}

export default PatternModalView
