import React from 'react'
import moment from 'moment'
import {Dialog, SelectField, MenuItem, RaisedButton} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, FormSelect } from 'components/modal/parts'

import {gaugeDurationTypes, gaugeResources, severities} from 'shared/Global'
// import { getSeverityIcon, parseSearchQuery, dateFormat, encodeUrlParams, severities } from 'shared/Global'
import DateRangePicker from 'components/common/DateRangePicker'

const durations = '1 2 3 5 10 15 30'.split(' ').map(p => ({
  label: p, value: p
}))

const fixOptions = [{
  label: 'Any', value: '',
}, {
  label: 'Unfixed', value: 'false'
}, {
  label: 'Fixed', value: 'true'
}]

export default class GaugeWizardView extends React.Component {
  renderNormal () {
    const {searchList, monitors, workflows, formValues, durationVisible} = this.props

    return (
      <div>
        <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top mr-dialog"/>
        <Field name="resource" component={FormSelect} floatingLabel="Resource" options={gaugeResources} className="valign-top"/>

        {formValues.resource === 'search' && <Field name="savedSearchId" component={FormSelect} floatingLabel="Saved Search" options={searchList} className="valign-top mr-dialog"/>}
        {formValues.resource === 'monitor' && <Field name="monitorId" component={FormSelect} floatingLabel="Monitor" options={monitors} className="valign-top mr-dialog"/>}
        {formValues.resource === 'incident' && <Field name="workflowId" component={FormSelect} floatingLabel="Workflow" options={workflows} className="valign-top mr-dialog"/>}

        {durationVisible ? (
          <div className="inline-block">
            <Field name="duration" component={FormSelect} floatingLabel="Duration" options={durations} className="valign-top mr-dialog" style={{width: 100}}/>
            <Field name="durationUnit" component={FormSelect} floatingLabel="  "options={gaugeDurationTypes} className="valign-top" style={{width: 120}}/>
          </div>
          ) : null
        }

        {formValues.resource === 'search' || formValues.resource === 'incident' ? (
          <div className="inline-block">
            <Field name="splitBy" component={FormSelect} floatingLabel="Resolution" options={durations} className="valign-top mr-dialog" style={{width: 100}}/>
            <Field name="splitUnit" component={FormSelect} floatingLabel="  "options={gaugeDurationTypes} className="valign-top" style={{width: 120}}/>
          </div>
          ) : null
        }
      </div>
    )
  }
  renderDateLabel (label) {
    return (
      <RaisedButton label={label}/>
    )
  }
  renderIncidentTable () {
    const {selectedSeverity, onChangeSeverity, dateFrom, dateTo, onChangeDateRange} = this.props
    return (
      <div>
        <Field name="name" component={FormInput} floatingLabel="Name" className="valign-top mr-dialog"/>
        <SelectField multiple floatingLabelText="Severity" onChange={onChangeSeverity} className="valign-top" value={selectedSeverity}>
          {severities.map(option =>
            <MenuItem key={option.value} insetChildren checked={selectedSeverity && selectedSeverity.includes(option.value)}
              value={option.value} primaryText={option.label}/>
          )}
        </SelectField>

        <Field name="fixed" component={FormSelect} floatingLabel="Status" options={fixOptions} className="valign-top mr-dialog"/>

        <div className="inline-block" style={{marginTop: 24}}>
          <DateRangePicker
            startDate={moment(dateFrom)}
            endDate={moment(dateTo)}
            onApply={onChangeDateRange.bind(this)}
            renderer={this.renderDateLabel.bind(this)}
          />
        </div>
      </div>
    )
  }

  renderContent () {
    const {templateName} = this.props
    switch(templateName) {
      case 'Incident Table':
        return this.renderIncidentTable()
      default:
        return this.renderNormal()
    }
  }
  render () {
    const {onSubmit, onHide, title} = this.props
    return (
      <Dialog open title={title || 'Gauge'} onRequestClose={onHide} contentStyle={{width: 585}}>
        <form onSubmit={onSubmit}>
          {this.renderContent()}
          <SubmitBlock name="Add" onClick={onHide} />
        </form>
      </Dialog>
    )
  }
}
