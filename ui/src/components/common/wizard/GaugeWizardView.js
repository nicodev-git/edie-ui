import React from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, FormSelect } from 'components/modal/parts'

const graphs = [{
  label: 'Line', value: 'line'
}, {
  label: 'Bar', value: 'bar'
}, {
  label: 'Pie', value: 'pie'
}]

export default class GaugeWizardView extends React.Component {
  render () {
    const {onSubmit, onHide, searchList} = this.props
    return (
      <Dialog open title="Gauge" onRequestClose={onHide}>
        <form onSubmit={onSubmit}>
          <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top"/>
          <Field name="savedSearch" component={FormSelect} floatingLabel="Saved Search" options={searchList} className="valign-top"/>
          <Field name="graph" component={FormSelect} floatingLabel="Saved Search" options={graphs} className="valign-top"/>
          <SubmitBlock name="Add" onClick={onHide} />
        </form>
      </Dialog>
    )
  }
}
