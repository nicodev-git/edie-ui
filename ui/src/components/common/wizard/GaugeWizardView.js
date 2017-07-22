import React from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, FormSelect } from 'components/modal/parts'

export default class GaugeWizardView extends React.Component {
  render () {
    const {onSubmit, onHide} = this.props
    return (
      <Dialog open title="Gauge" onRequestClose={onHide}>
        <form onSubmit={onSubmit}>
          <Field type="name" component={FormInput} floatingLabel="Name"/>
          <Field type="savedSearch" component={FormSelect} floatingLabel="Saved Search"/>
          <SubmitBlock name="Add" onClick={onHide} />
        </form>
      </Dialog>
    )
  }
}
