import React, { Component } from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, ProfileImageUpload, FormInput, FormSelect, FormMultiSelect, CheckboxItem } from './parts'

export default class ProfileModalView extends Component {
  render () {
    const {imgSrc, onHide, onSubmit, onChangeImage, mapOptions, roleOptions,
      defaultChecked, checkboxLabel, onChangeRoles} = this.props
    return (
      <Dialog open title="Profile">
        <form onSubmit={onSubmit}>
          <ProfileImageUpload imgSrc={imgSrc} onChangeImage={onChangeImage} />
          <div className="form-column">
            <Field name="username" component={FormInput} label="User Name"/>
            <Field name="fullname" component={FormInput} label="Full Name"/>
            <Field name="email" component={FormInput} label="Email"/>
            <Field name="phone" component={FormInput} label="Phone"/>
            <Field name="defaultMapId" component={FormSelect} label="Default Map" options={mapOptions}/>
            <Field name="roles" type="select" component={FormMultiSelect} label="Role" options={roleOptions} props={{onChange: onChangeRoles}} />
            <CheckboxItem label={checkboxLabel} disabled defaultChecked={defaultChecked}/>
          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Dialog>
    )
  }
}
