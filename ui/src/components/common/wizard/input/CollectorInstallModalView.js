import React from 'react'
import {RaisedButton, IconButton, SelectField} from 'material-ui'
import { Field, Form } from 'redux-form'
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh'

import { FormInput, SubmitBlock, Modal, CardPanel } from 'components/modal/parts'
import {ROOT_URL} from 'actions/config'

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
      <div>
        <CardPanel title="Collector Install">
          Please install this collector on your windows pc.<br/>
          Please make sure collector port(534 by default) is open to incident manager server.<br/>
          You can click refresh after installed and click Test to check.<br/>

          <div className="margin-lg-top">
            <div className="valign-middle inline-block" style={{marginTop: -20}}>
              <SelectField floatingLabelText="Collector"/>
            </div>
            <IconButton className="valign-middle"><RefreshIcon/></IconButton>
            <RaisedButton label="Test" className="valign-middle margin-md-left"/>
          </div>
        </CardPanel>
        <a
          href={`${ROOT_URL}/downloadCollector?filename=`}
          target="_blank"
          style={{textDecoration: 'underline', fontSize: 13}}>
          Click here to download collector.</a><br/>
      </div>
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
