import React from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, FormSelect } from 'components/modal/parts'

const types = [{
  label: 'Windows', value: 'WINDOWS'
}, {
  label: 'Linux', type: 'LINUX'
}]

export default class CollectorModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Dialog open title="Collector" onRequestClose={onHide} contentStyle={{width: 350}}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="name" component={FormInput} label="Name"/>
            <Field name="version" component={FormInput} label="Version"/>
            <Field name="type" component={FormSelect} label="Type"/>
          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Dialog>
    )
  }
}
