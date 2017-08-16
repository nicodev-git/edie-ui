import React from 'react'
import {Field} from 'redux-form'

import {FormInput, SubmitBlock, Modal} from 'components/modal/parts'

class FilterModalView extends React.Component {
  render () {
    const {onClickClose, onSubmit} = this.props
    return (
      <Modal title="Filter" onRequestClose={onClickClose}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="text" component={FormInput} type="text" label="Filter"/>
          </div>
          <SubmitBlock name="Save" onClick={onClickClose}/>
        </form>
      </Modal>
    )
  }
}

export default FilterModalView
