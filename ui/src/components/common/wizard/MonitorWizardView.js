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
    const collectorOptions = collectors.map(p => ({
      label: p.name, value: p.id
    }))
    return (
      <div>
        <CardLegend>Agent/Collector</CardLegend>
        <Card>
          <CardText className="pb-none">
            <Field name="agentType" component={RadioButtonGroup} style={{height: 30, marginTop: 12, marginRight: 20, float: 'left'}}>
              <RadioButton value="agent" label="Agent" className="pull-left" style={{width: 100}}/>
              <RadioButton value="collector" label="Collector" className="pull-left" style={{width: 100}}/>
            </Field>
            <Field name="collectorId" label="Collector" component={FormSelect} options={collectorOptions}/>
          </CardText>
        </Card>
      </div>
    )
  }

  render () {
    const {header, onSubmit, onHide, paramEditModal, credPicker, tagsView, paramsView,
      requiredParamKeys,
      credentials} = this.props
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
