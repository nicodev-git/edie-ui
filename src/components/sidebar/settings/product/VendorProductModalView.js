import React from 'react'
import { Field } from 'redux-form'

import {Button} from '@material-ui/core'
import { FormInput } from 'components/modal/parts'

export default class SimulationModalView extends React.Component {
  render () {
    const {onSubmit} = this.props
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

          <Button variant="raised" type="submit" className="margin-md-top">Save</Button>
        </form>
      </div>
    )
  }
}
