import React from 'react'
import {Button, Radio} from '@material-ui/core'
import {Field} from 'redux-form'
import {FormControlLabel} from '@material-ui/core'

import {FormInput, FormCheckbox, FormSelect, CardPanel, Modal, FormRadioGroup} from 'components/modal/parts'
import BasicMonitorTable from 'components/common/wizard/input/BasicMonitorTable'

import {removeAfterDurations, removeAfterDurationUnits} from 'shared/Global'

const paramLabels = {
  'checkinterval': 'Interval (seconds)',
  'timeout': 'Timeout (seconds)',
  'dynamicFile': 'Dynamic File'
}

const paramHints = {
  'filepath': '/var/log/messages'
}

const integratedOptions = [{
  label: 'User/Pass', value: 'false'
}, {
  label: 'Integrated', value: 'true'
}]

export default class MonitorWizardView extends React.Component {
  renderBasicMonitor () {
    const {allValues} = this.props
    if (!allValues || allValues.monitortype !== 'basic') return

    return (
      <CardPanel title="Basic Monitor">
        <BasicMonitorTable />
      </CardPanel>
    )
  }
  renderRequiredParams () {
    const {requiredParamKeys} = this.props
    return requiredParamKeys.map(k => {
      if (k === 'remove_after') return null
      const hintText = paramHints[k] || ''
      if (k === 'authentication') {
        return <Field
          key={k} name={k} floatingLabel={paramLabels[k] || k} component={FormSelect}
          options={integratedOptions}
          className="margin-sm-left margin-sm-right"/>
      } else if (k === 'dynamicFile') {
        return <Field
          key={k} name={k} component={FormCheckbox} className="margin-sm-left margin-sm-right"
          label={paramLabels[k] || k}
        />
      }
      return (
        <Field
          key={k} name={k} floatingLabel={paramLabels[k] || k}
          component={FormInput} className="margin-sm-left margin-sm-right"
          multiline={k === 'shell'}
          label={hintText}
        />
      )
    })
  }
  render () {
    const {header, onSubmit, onHide, paramEditModal, tagsView, credPicker, paramsView,
      credentials,
      showAgentType, collectors, agent,
      isEdit
    } = this.props

    const collectorOptions = collectors.map(p => ({
      label: p.name, value: p.id
    }))

    let agentLabel = 'Agent'
    if (!agent) {
      agentLabel = (
        <div >
          <div className="inline-block" style={{width: 100}}>Agent</div>
          <div className="inline-block" style={{textDecoration: 'underline', color: 'rgba(0, 0, 0, 0.87)'}}>Install Agent</div>
        </div>
      )
    }

    const collectorLabel = (
      <div style={{width: 100}} className="inline-block">Collector</div>
    )

    return (
      <Modal title={header} onRequestClose={onHide}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Configuration">
            <Field name="name" floatingLabel="Name" component={FormInput} className="margin-sm-left margin-sm-right"/>
            {this.renderRequiredParams()}
            <div>
              <div className="inline-block valign-middle margin-md-top margin-md-right" style={{fontSize: '16px', paddingLeft: 7}}>Remove events after</div>
              <Field
                name="remove_after" component={FormSelect} options={removeAfterDurations}
                style={{width: 80, paddingLeft: 15}} className="valign-middle"/>
              <Field
                name="remove_after_unit" component={FormSelect} options={removeAfterDurationUnits}
                style={{width: 120}} className="valign-middle"/>
            </div>

            <div className={showAgentType ? '' : 'hidden'} style={{position: 'relative'}}>
              <Field name="agentType" component={FormRadioGroup} className="margin-md-top">
                <FormControlLabel control={<Radio />} value="agent" label={agentLabel} disabled={!agent}/>
                <FormControlLabel control={<Radio />} value="collector" label={collectorLabel}/>
              </Field>
              <div style={{position: 'absolute', left: 132, bottom: 10}}>
                <Field name="collectorId" label="Collector" component={FormSelect} options={collectorOptions}/>
              </div>
            </div>
          </CardPanel>

          <div className="hidden">
            <CardPanel title="Credentials">
              <Field name="credentialId" component={FormSelect} className="margin-sm-left margin-sm-right" options={credentials}/>
            </CardPanel>
          </div>

          {this.renderBasicMonitor()}

          {paramsView}
          {tagsView}

          <Field name="enabled" component={FormCheckbox} label="Enabled"/>

          <div className="form-buttons">
            <Button variant="raised" type="submit">{isEdit ? 'Save' : 'Add'}</Button>
          </div>
        </form>
        {paramEditModal}
        {credPicker}
      </Modal>
    )
  }
}
