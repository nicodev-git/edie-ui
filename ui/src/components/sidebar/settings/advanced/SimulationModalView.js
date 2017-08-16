import React from 'react'
import { Field } from 'redux-form'

import { SubmitBlock, FormInput, Modal } from 'components/modal/parts'

export default class SimulationModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Modal title="Simulation" onRequestClose={onHide}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="text" component={FormInput} floatingLabel="Text"/>
          </div>
          <SubmitBlock name="Send" onClick={onHide}/>
        </form>
      </Modal>
    )
  }
}
