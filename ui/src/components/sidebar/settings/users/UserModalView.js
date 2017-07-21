import React from 'react'

import Dialog from 'material-ui/Dialog'
import { Field } from 'redux-form'
import { SubHeader, FormInput, FormSelect, FormImg, FileUpload, FormCheckbox,
  SubmitBlock } from 'components/modal/parts'

export default class UserModalView extends React.Component {
  render () {
    const {onHide, onSubmit, defaultmaps, role} = this.props
    return (
      <Dialog open title="User" onRequestClose={onHide}>
        {(subheader) ? (<SubHeader name={subheader}/>) : null}
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="username" component={FormInput} label="Name"/>
            <Field name="fullname" component={FormInput} label="Full Name"/>
            <Field name="password" type="password" component={FormInput} label="Password"/>
            <Field name="email" component={FormInput} label="Email"/>
            <Field name="phone" component={FormInput} label="Phone"/>
            <Field name="defaultmap" component={FormInput} label="Default Map" options={defaultmaps}/>
            <Field name="role" component={FormInput} label="Default Map" options={roles}/>
          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Dialog>
    )
  }
}
