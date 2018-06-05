import React from 'react'
import {Button, IconButton} from '@material-ui/core'
import { Field, Form } from 'redux-form'
import RefreshIcon from '@material-ui/icons/Refresh'

import { FormInput, FormSelect, SubmitBlock, Modal, CardPanel } from 'components/modal/parts'
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
    const {onClickRefresh, onClickTest, collectors} = this.props
    return (
      <div>
        <CardPanel title="Collector Install">
          Please install this collector on your windows pc.<br/>
          Please make sure collector port(534 by default) is open to incident manager server.<br/>
          You can click refresh after installed and click Test to check.<br/>

          <div className="margin-lg-top">
            <div className="valign-middle inline-block" style={{marginTop: -20}}>
              <Field
                name="collectorId" component={FormSelect} floatingLabel="Collector"
                options={collectors.map(p => ({value: p.id, label: p.name}))}/>
            </div>
            <IconButton className="valign-middle" onClick={onClickRefresh}><RefreshIcon/></IconButton>
            <Button variant="raised" className="valign-middle margin-md-left" onClick={onClickTest}>
              Test
            </Button>
          </div>
        </CardPanel>
        <a
          href={`${ROOT_URL}/download/windows collector`}
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
