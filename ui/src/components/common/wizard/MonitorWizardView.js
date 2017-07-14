import React from 'react'
import {Dialog, Card, CardText} from 'material-ui'
import {Field} from 'redux-form'
import {keys} from 'lodash'

import {SubmitBlock, FormInput, FormCheckbox} from 'components/modal/parts'

export default class MonitorWizardView extends React.Component {
  render () {
    const {header, onSubmit, onHide, paramEditModal, credPicker, tagsView, paramsView,
      monitorConfig} = this.props
    return (
      <Dialog open title={header}>
        <form onSubmit={onSubmit}>
          <div>Configuration</div>
          <Card>
            <CardText>
              <Field name="name" floatingLabel="Name" component={FormInput} className="margin-sm-left margin-sm-right"/>
              {keys(monitorConfig.params || {}).map(k =>
                <Field key={k} name={k} floatingLabel={k} component={FormInput} className="margin-sm-left margin-sm-right"/>
              )}
            </CardText>
          </Card>
          {paramsView}
          <Field name="enabled" component={FormCheckbox} type="checkbox" label="Enabled" className="margin-sm-top margin-sm-bottom"/>

          {/*{tagsView}*/}
          <SubmitBlock name="Finish" onClick={onHide}/>
        </form>
        {paramEditModal}
        {credPicker}
      </Dialog>
    )
  }
}
