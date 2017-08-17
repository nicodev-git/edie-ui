import React from 'react'
import {Field} from 'redux-form'
import {Card} from 'material-ui'

import {FormInput, SubmitBlock, Modal} from 'components/modal/parts'

class FilterModalView extends React.Component {
  render () {
    const {onClickClose, onSubmit} = this.props
    return (
      <Modal title="Filter" onRequestClose={onClickClose}>
        <form onSubmit={onSubmit}>
          <Card>
            <div className="form-column">
              <Field name="text" component={FormInput} type="text" label="Filter"/>
            </div>
          </Card>
          <SubmitBlock name="Save" onClick={onClickClose}/>
        </form>
      </Modal>
    )
  }
}

export default FilterModalView
