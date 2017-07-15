import React from 'react'
import {Dialog, Card, CardText, RaisedButton, RadioButton} from 'material-ui'
import {Field} from 'redux-form'
import {RadioButtonGroup} from 'redux-form-material-ui'

import {FormInput, FormCheckbox, FormSelect, CardLegend, CloseIconButton} from 'components/modal/parts'

const dialogStyle = {
  background: '#efefef',
  padding: '8px 48px 48px'
}
const titleStyle = {
  background: '#324454',
  color: 'white',
  fontSize: 14,
  paddingTop: 12,
  paddingBottom: 12
}

const paramLabels = {
  'checkinterval': 'Interval (seconds)',
  'timeout': 'Timeout (seconds)'
}

export default class MonitorWizardView extends React.Component {
  render () {
    const {header, onSubmit, onHide, paramEditModal, credPicker, tagsView, paramsView,
      requiredParamKeys,
      credentials,
      showAgentType, collectors, agent
    } = this.props

    const collectorOptions = collectors.map(p => ({
      label: p.name, value: p.id
    }))

    return (
      <Dialog open title={header} bodyStyle={dialogStyle} titleStyle={titleStyle} onRequestClose={onHide}>
        <CloseIconButton onClick={onHide} color="white"/>
        <form onSubmit={onSubmit}>
          <CardLegend>Configuration</CardLegend>
          <Card>
            <CardText>
              <Field name="name" floatingLabel="Name" component={FormInput} className="margin-sm-left margin-sm-right"/>
              {requiredParamKeys.map(k =>
                <Field key={k} name={k} floatingLabel={paramLabels[k] || k} component={FormInput} className="margin-sm-left margin-sm-right"/>
              )}

              <div className={showAgentType ? '' : 'hidden'}>
                <Field name="agentType" component={RadioButtonGroup} className="margin-md-top">
                  <RadioButton value="agent" label={agent ? 'Agent' : <span style={{textDecoration: 'underline'}}>Install Agent</span>} className="pull-left" disabled={!agent}/>
                  <RadioButton value="collector" label="Collector" className="pull-left" style={{width: 100, marginTop: 14, marginRight: 20}}/>
                </Field>
                <Field name="collectorId" label="Collector" component={FormSelect} className="pull-left" options={collectorOptions}/>
              </div>
            </CardText>
          </Card>

          <CardLegend>Credentials</CardLegend>
          <Card>
            <CardText>
              <Field name="credentialId" component={FormSelect} className="margin-sm-left margin-sm-right" options={credentials}/>
            </CardText>
          </Card>

          {paramsView}

          <Field name="enabled" component={FormCheckbox} type="checkbox" label="Enabled" className="margin-md-top margin-sm-bottom"/>

          {/*{tagsView}*/}
          <div className="form-buttons">
            <RaisedButton type="submit" label="Add"/>
          </div>
        </form>
        {paramEditModal}
        {credPicker}
      </Dialog>
    )
  }
}
