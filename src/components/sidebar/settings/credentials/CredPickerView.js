import React from 'react'
import {Select, MenuItem, Chip} from '@material-ui/core'

import {TwoButtonsBlockCustom, Modal, CardPanel} from 'components/modal/parts'
import { chipStyles } from 'style/common/materialStyles'

export default class CredPickerView extends React.Component {
  renderLeftTools () {
    const {credentialTypes, type, onChangeType} = this.props
    return (
      <div style={{marginTop: -6}}>
        <Select onChange={onChangeType} value={type}>
          <MenuItem value="">[All]</MenuItem>
          {credentialTypes.map(p =>
            <MenuItem key={p.name} value={p.name}>{p.name}</MenuItem>
          )}
        </Select>
      </div>
    )
  }

  render () {
    const {credentials, onHide, onClickOK, onSelect, selectedCreds, type, global} = this.props
    let filtered = type ? credentials.filter(p => p.type === type) : credentials
    if (global) filtered = filtered.filter(p => p.global)
    return (
      <Modal title="Credentials" onRequestClose={onHide}>
        <CardPanel title="Credentials">
          {this.renderLeftTools()}
          <div style={{height: 300, overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Type</th>
                <th>User</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {filtered.map((p, i) =>
                <tr
                  key={i}
                  onClick={() => onSelect(p)}
                  className={selectedCreds && selectedCreds.id === p.id ? 'selected' : ''}
                >
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.type}</td>
                  <td>{p.username}</td>
                  <td>
                    {p.global ? (p.default ? (
                      <div style={chipStyles.wrapper}>
                        <Chip style={chipStyles.smallChip} label={<span>{p.type}&nbsp;Default</span>}/>
                      </div>
                    ) : 'Global') : null}
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </CardPanel>
        <TwoButtonsBlockCustom name1="OK" name2="Cancel" action1={onClickOK} action2={onHide}/>
      </Modal>
    )
  }
}
