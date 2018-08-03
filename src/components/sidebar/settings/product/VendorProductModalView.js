import React from 'react'
import { Field } from 'redux-form'

import { SubmitBlock, FormInput, CardPanel } from 'components/modal/parts'

export default class SimulationModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <div className="flex-1 padding-md">
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-3 col-lg-2">
              <Field name="name" component={FormInput} floatingLabel="Name" className="margin-md-right" fullWidth/>
            </div>
            <div className="col-md-8 col-lg-6">
              <Field name="description" component={FormInput} floatingLabel="Description" className="margin-md-right" fullWidth/>
            </div>
          </div>

          <SubmitBlock name="Save"/>
        </form>
      </div>
    )
  }
}
