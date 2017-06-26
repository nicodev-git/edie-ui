import React from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import { FormInput, SubmitSingle } from 'components/modal/parts'

const ActivationModalView = ({onHide, onSignup}) => (
  <Dialog open title="License Activation">
      <form onSubmit={onSignup}>
        <div className="form-column">
          <Field name="email" component={FormInput} autoComplete="off" label="Email"/>
          <Field name="license" component={FormInput} autoComplete="off" label="License"/>
        </div>
        <SubmitSingle name="Activate"/>
      </form>
  </Dialog>
)

export default ActivationModalView
