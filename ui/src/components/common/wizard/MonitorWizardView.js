import React from 'react'
import {Dialog, Card, CardText, RaisedButton} from 'material-ui'
import {Field} from 'redux-form'
import {keys} from 'lodash'

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
    const {showAgentType} = this.props
    if (!showAgentType) return null
    return (
      <div>
        <CardLegend>Agent/Collector</CardLegend>
        <Card>
          <CardText>
            <Field name="name" floatingLabel="Name" component={FormInput} className="margin-sm-left margin-sm-right"/>
          </CardText>
        </Card>
      </div>
    )
  }

  render () {
    const {header, onSubmit, onHide, paramEditModal, credPicker, tagsView, paramsView,
      monitorConfig,
      credentials} = this.props
    return (
      <Dialog open title={header} bodyStyle={dialogStyle} titleStyle={titleStyle}>
        <form onSubmit={onSubmit}>
          {this.renderAgentType()}
          <CardLegend>Configuration</CardLegend>
          <Card>
            <CardText>
              <Field name="name" floatingLabel="Name" component={FormInput} className="margin-sm-left margin-sm-right"/>
              {keys(monitorConfig.params || {}).map(k =>
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
            <RaisedButton type="submit" label="Finish" onTouchTap={onSubmit}/>
            <RaisedButton label="Cancel" onTouchTap={onHide}/>
          </div>
        </form>
        {paramEditModal}
        {credPicker}
      </Dialog>
    )
  }
}
