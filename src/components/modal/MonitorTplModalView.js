import React, { Component } from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, ImageUploader, FormCheckbox } from './parts'

export default class MonitorTplModalView extends Component {
  render () {
    const {header, imgUrl, onSubmit, onHide, onChange} = this.props
    return (
      <Dialog open title={header}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="name" component={FormInput} label="Name"/>
            <Field name="description" component={FormInput} label="Description"/>
            <Field name="monitortype" component={FormInput} label="Monitor type"/>
            <Field name="enabled" component={FormCheckbox} label="Enabled" labelPosition="right"/>
            <ImageUploader imgUrl={imgUrl} onChange={onChange}/>
          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Dialog>
    )
  }
}
