import React from 'react'
import { Field } from 'redux-form'

import { SubmitBlock, FormInput, Modal, CardPanel } from 'components/modal/parts'

export default class SimulationModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <form onSubmit={onSubmit}>
        <CardPanel title="Vendor Product">
          <div className="form-column">
            <Field name="text" component={FormInput} floatingLabel="Text"/>
          </div>
        </CardPanel>
        <SubmitBlock name="Send" onClick={onHide}/>
      </form>
    )
  }
}
