import React from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, FormSelect } from 'components/modal/parts'

const resources = [{
  label: 'Search', value: 'search'
}, {
  label: 'Monitor', value: 'monitor'
}]

export default class GaugeWizardView extends React.Component {
  render () {
    const {onSubmit, onHide, searchList, monitors, title} = this.props
    return (
      <Dialog open title={title || 'Gauge'} onRequestClose={onHide} contentStyle={{width: 585}}>
        <form onSubmit={onSubmit}>
          <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top"/>
          <Field name="resource" component={FormSelect} floatingLabel="Resource" options={resources} className="valign-top ml-dialog"/>
          <Field name="savedSearchId" component={FormSelect} floatingLabel="Saved Search" options={searchList} className="valign-top"/>
          {monitors && <Field name="monitorId" component={FormSelect} floatingLabel="Monitor" options={monitors} className="valign-top ml-dialog"/>}

          <SubmitBlock name="Add" onClick={onHide} />
        </form>
      </Dialog>
    )
  }
}
