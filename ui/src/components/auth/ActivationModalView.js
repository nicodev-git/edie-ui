import React from 'react'
import { Field } from 'redux-form'
import {Card} from 'material-ui'
import { FormInput, SubmitSingle, Modal } from 'components/modal/parts'

const ActivationModalView = ({onHide, onSignup}) => (
  <Modal title="License Activation">
      <form onSubmit={onSignup}>
        <Card>
          <div className="form-column">
            <Field name="email" component={FormInput} autoComplete="off" label="Email"/>
            <Field name="license" component={FormInput} autoComplete="off" label="License"/>
          </div>
        </Card>
        <SubmitSingle name="Activate"/>
      </form>
  </Modal>
)

export default ActivationModalView
