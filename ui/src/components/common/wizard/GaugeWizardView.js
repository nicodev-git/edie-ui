import React from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, FormSelect } from 'components/modal/parts'

import {gaugeGraphs} from 'shared/Global'

export default class GaugeWizardView extends React.Component {
  render () {
    const {onSubmit, onHide, searchList} = this.props
    return (
      <Dialog open title="Gauge" onRequestClose={onHide} contentStyle={{width: 585}}>
        <form onSubmit={onSubmit}>
          <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top"/>
          <Field name="savedSearch" component={FormSelect} floatingLabel="Saved Search" options={searchList} className="valign-top ml-dialog"/>
          <Field name="graph" component={FormSelect} floatingLabel="Graph" options={gaugeGraphs} className="valign-top"/>
          <SubmitBlock name="Add" onClick={onHide} />
        </form>
      </Dialog>
    )
  }
}
