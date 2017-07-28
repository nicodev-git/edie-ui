import React from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, FormSelect } from 'components/modal/parts'

import {gaugeDurationTypes} from 'shared/Global'

const resources = [{
  label: 'Search', value: 'search'
}, {
  label: 'Monitor', value: 'monitor'
}]

const durations = '1 2 3 5 10 15 30'.split(' ').map(p => ({
  label: p, value: p
}))

export default class GaugeWizardView extends React.Component {
  render () {
    const {onSubmit, onHide, searchList, monitors, title} = this.props
    return (
      <Dialog open title={title || 'Gauge'} onRequestClose={onHide} contentStyle={{width: 585}}>
        <form onSubmit={onSubmit}>
          <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top"/>
          <Field name="resource" component={FormSelect} floatingLabel="Resource" options={resources} className="valign-top ml-dialog"/>
          <Field name="savedSearchId" component={FormSelect} floatingLabel="Saved Search" options={searchList} className="valign-top"/>
          <Field name="monitorId" component={FormSelect} floatingLabel="Monitor" options={monitors} className="valign-top ml-dialog"/>

          <Field name="duration" component={FormSelect} floatingLabel="Duration" options={durations} className="valign-top"/>
          <Field name="durationUnit" component={FormSelect} options={gaugeDurationTypes} className="valign-top"/>

          <SubmitBlock name="Add" onClick={onHide} />
        </form>
      </Dialog>
    )
  }
}
