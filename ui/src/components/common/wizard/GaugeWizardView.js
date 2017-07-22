import React from 'react'
import {Dialog, RaisedButton} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput } from 'components/modal/parts'

export default class GaugeWizardView extends React.Component {
  render () {
    const {onSubmit, onHide} = this.props
    return (
      <Dialog open title="Gauge" onRequestClose={onHide}>
        <form onSubmit={onSubmit}>
          <Field type="name" component={FormInput} />
          <div>
            <RaisedButton label="Add" type="submit"/>
            <RaisedButton label="Cancel" onTouchTap={onHide}/>
          </div>
        </form>
      </Dialog>
    )
  }
}
