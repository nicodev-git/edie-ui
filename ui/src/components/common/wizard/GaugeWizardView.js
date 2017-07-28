import React from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, FormSelect } from 'components/modal/parts'

export default class GaugeWizardView extends React.Component {
  render () {
    const {onSubmit, onHide, searchList} = this.props
    return (
      <Dialog open title="Gauge" onRequestClose={onHide} contentStyle={{width: 585}}>
        <form onSubmit={onSubmit}>
          <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top"/>
          <Field name="savedSearchId" component={FormSelect} floatingLabel="Saved Search" options={searchList} className="valign-top ml-dialog"/>
          <SubmitBlock name="Add" onClick={onHide} />
        </form>
      </Dialog>
    )
  }
}
