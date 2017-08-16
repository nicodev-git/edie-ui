import React from 'react'
import {Checkbox} from 'material-ui'
import { Field } from 'redux-form'

import { SubmitBlock, FormInput, Modal } from 'components/modal/parts'

export default class MapModalView extends React.Component {
  renderUserCheck(p) {
    const {mapUsers, toggleMapUser} = this.props
    const checked = mapUsers.indexOf(p.username) >= 0
    return (
      <tr key={p.id}><td>
        <Checkbox label={p.username} checked={checked} onCheck={() => toggleMapUser(p.username)}/>
      </td></tr>
    )
  }
  render () {
    const {onHide, onSubmit, users} = this.props
    return (
      <Modal title="Map" onRequestClose={onHide} contentStyle={{width: 585}}>
        <form onSubmit={onSubmit}>
          <Field name="name" component={FormInput} floatingLabel="Name" className="mr-dialog"/>
          <Field name="description" component={FormInput} floatingLabel="Description"/>
          <Field name="mapgroup" component={FormInput} floatingLabel="Group" className="mr-dialog"/>

          <h4>Map Users</h4>
          <div style={{maxHeight: 250, overflow: 'auto'}}>
            <table className="table table-hover">
              <tbody>
              {users.map(p => this.renderUserCheck(p))}
              </tbody>
            </table>
          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Modal>
    )
  }
}
