import React from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput } from 'components/modal/parts'

export default class AgentModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Dialog open title="Agent" onRequestClose={onHide} contentStyle={{width: 350}}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="name" component={FormInput} label="Name"/>
            <Field name="version" component={FormInput} label="Version"/>
          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Dialog>
    )
  }
}
