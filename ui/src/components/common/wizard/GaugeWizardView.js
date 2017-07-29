import React from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, FormSelect } from 'components/modal/parts'

import {gaugeDurationTypes, gaugeResources} from 'shared/Global'

const durations = '1 2 3 5 10 15 30'.split(' ').map(p => ({
  label: p, value: p
}))

export default class GaugeWizardView extends React.Component {
  render () {
    const {onSubmit, onHide, searchList, monitors, title, formValues, durationVisible} = this.props
    return (
      <Dialog open title={title || 'Gauge'} onRequestClose={onHide} contentStyle={{width: 585}}>
        <form onSubmit={onSubmit}>
          <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top mr-dialog"/>
          <Field name="resource" component={FormSelect} floatingLabel="Resource" options={gaugeResources} className="valign-top"/>

          {formValues.resource === 'search' && <Field name="savedSearchId" component={FormSelect} floatingLabel="Saved Search" options={searchList} className="valign-top mr-dialog"/>}
          {formValues.resource === 'monitor' && <Field name="monitorId" component={FormSelect} floatingLabel="Monitor" options={monitors} className="valign-top"/>}

          <div className={durationVisible ? '' : 'hidden'}>
            <Field name="duration" component={FormSelect} floatingLabel="Duration" options={durations} className="valign-top mr-dialog" style={{width: 100}}/>
            <Field name="durationUnit" component={FormSelect} floatingLabel="  "options={gaugeDurationTypes} className="valign-top" style={{width: 120}}/>
          </div>

          <SubmitBlock name="Add" onClick={onHide} />
        </form>
      </Dialog>
    )
  }
}
