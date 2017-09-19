import React from 'react'
// import { Field } from 'redux-form'
import { IconButton } from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
// import {FormSelect, FormInput} from 'components/modal/parts'

import { CardPanel } from 'components/modal/parts'

export default class CredPicker extends React.Component {
  // render () {
  //   const {credentials, credentialTypes, onChangeCredential} = this.props
  //   const options = credentials.map(p => ({label: p.name, value: p.id}))
  //   const typeOptions = credentialTypes.map(p => ({label: p.name, value: p.name}))
  //   return (
  //     <div className="flex-horizontal">
  //       <div>
  //         <RadioButtonGroup name="credentialSelect" defaultSelected="existing" onChange={(e, value) => onChangeCredential(value)}>
  //           <RadioButton value="" label="None"/>
  //           <RadioButton value="existing" label="Existing" style={{marginTop: 30}}/>
  //           <RadioButton value="new" label="New" style={{marginTop: 30}} />
  //         </RadioButtonGroup>
  //       </div>
  //       <div className="flex-1" style={{paddingLeft: 16, paddingTop: 36}}>
  //         <div>
  //           <Field name="credentialId" component={FormSelect} className="valign-top mr-dialog" options={options} floatingLabel="Credential" style={{marginTop: -20}}/>
  //         </div>
  //         <div style={{marginTop: -20}}>
  //           <Field name="credtype" component={FormSelect} className="valign-top" floatingLabel="Type" style={{width: 150, marginRight: 12}} options={typeOptions}/>
  //           <Field name="creduser" component={FormInput} className="valign-top mr-dialog" floatingLabel="User" style={{width: 150}}/>
  //           <Field name="credpassword" component={FormInput} type="password" className="valign-top" floatingLabel="Password" style={{width: 150}}/>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
  onClickAdd () {
    this.props.showDeviceCredsPicker(true)
  }
  getCredentials() {
    const {credentials} = this.props
    return credentials.filter(p => p.global && p.isDefault)
  }

  renderButtons () {
    return (
      <div>
        <IconButton onTouchTap={this.onClickAdd.bind(this)} tooltip="Add Credentials">
          <AddCircleIcon size={32}/>
        </IconButton>
      </div>
    )
  }
  render () {
    const credentials = this.props.deviceCredentials
    return (
      <CardPanel title="Credentials" tools={this.renderButtons()}>
        <div style={{maxHeight: 300, overflow: 'auto'}}>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>User</th>
              <th />
            </tr>
            </thead>
            <tbody>
            {credentials.map((p, i) =>
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.type}</td>
                <td>{p.description}</td>
                <td>{p.username}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </CardPanel>
    )
  }
}
