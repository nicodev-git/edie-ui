import React from 'react'
import {Dialog, Card, CardText, RaisedButton, RadioButton} from 'material-ui'
import {Field} from 'redux-form'
import {RadioButtonGroup} from 'redux-form-material-ui'

import {FormInput, FormCheckbox, FormSelect, CardLegend} from 'components/modal/parts'

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

export default class MonitorWizardView extends React.Component {
  renderAgentType () {
    const {showAgentType, collectors} = this.props
    if (!showAgentType) return null

    return (
      <div>
        <CardLegend>Agent/Collector</CardLegend>
        <Card>
          <CardText className="pb-none">

          </CardText>
        </Card>
      </div>
    )
  }

  render () {
    const {header, onSubmit, onHide, paramEditModal, credPicker, tagsView, paramsView,
      requiredParamKeys,
      credentials,
      showAgentType, collectors
    } = this.props

    const collectorOptions = collectors.map(p => ({
      label: p.name, value: p.id
    }))

    return (
      <Dialog open title={header} bodyStyle={dialogStyle} titleStyle={titleStyle} onRequestClose={onHide}>
        <form onSubmit={onSubmit}>
          {this.renderAgentType()}
          <CardLegend>Configuration</CardLegend>
          <Card>
            <CardText>
              <Field name="name" floatingLabel="Name" component={FormInput} className="margin-sm-left margin-sm-right"/>
              {requiredParamKeys.map(k =>
                <Field key={k} name={k} floatingLabel={k} component={FormInput} className="margin-sm-left margin-sm-right"/>
              )}

              <div className={showAgentType ? '' : 'hidden'}>
                <Field name="agentType" component={RadioButtonGroup}>
                  <RadioButton value="agent" label="Agent" className="pull-left"/>
                  <RadioButton value="collector" label="Collector" className="pull-left" style={{width: 100}}/>
                </Field>
                <div>
                  <Field name="collectorId" label="Collector" component={FormSelect} className="pull-left" options={collectorOptions}/>
                </div>

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
            <RaisedButton type="submit" label="Finish"/>
            <RaisedButton label="Cancel" onTouchTap={onHide}/>
          </div>
        </form>
        {paramEditModal}
        {credPicker}
      </Dialog>
    )
  }
}
