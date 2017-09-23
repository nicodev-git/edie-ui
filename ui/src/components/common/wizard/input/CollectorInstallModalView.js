import React from 'react'
import {RaisedButton, IconButton, SelectField} from 'material-ui'
import { Field, Form } from 'redux-form'
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh'

import { FormInput, SubmitBlock, Modal, CardPanel } from 'components/modal/parts'

export default class CollectorInstallModalView extends React.Component {
  renderForm () {
    return (
      <CardPanel>
        <Field name="ip" component={FormInput} floatingLabel="IP"/>
        <Field name="user" component={FormInput} floatingLabel="User"/>
        <Field name="password" component={FormInput} floatingLabel="Password"/>

        <SubmitBlock name="Install"/>
      </CardPanel>
    )
  }
  renderDownload () {
    return (
      <CardPanel>
        <a href="/device/downloadCollector" target="_blank">Click here to download collector.</a><br/>
        Please install this collector on your windows pc.<br/>
        Please make sure collector port(534 by default) is open to incident manager server.<br/>
        You can click refresh after installed and click Test to check.<br/>

        <div>
          <RaisedButton label="Test" className="valign-middle"/>
          <SelectField floatingLabelText="Collector" style={{verticalAlign: 'middle'}}/>
          <IconButton className="valign-middle"><RefreshIcon/></IconButton>
        </div>
      </CardPanel>
    )
  }
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Modal title="Collector Install" onRequestClose={onHide}>
        <Form onSubmit={onSubmit} autoComplete="off">
          {this.renderDownload()}
        </Form>
      </Modal>
    )
  }
}
