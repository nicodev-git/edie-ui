import React from 'react'
import Modal from 'react-bootstrap-modal'
import {SelectField, MenuItem} from 'material-ui'

import { Header, CloseButton } from './parts'

export default class RelDevicesModalView extends React.Component {
  renderItems () {
    const {relDevices, isIP} = this.props
    return relDevices.map(d =>
      <tr key={d.name}>
        <td>{d.name}</td>
        {isIP ? <td>{d.hostname}</td> : null}
        {isIP ? <td>{d.country}</td> : null}
      </tr>
    )
  }
  render () {
    const {
      onHide,
      searchFields,
      onChangeSearchField,
      fields
    } = this.props
    return (
      <Modal show onHide={onHide} aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary modal-w-fit">
        <Header name="Relevant Devices"/>
        <div className="modal-body bootstrap-dialog-message">
          <div>
            <SelectField
              hintText="Field"
              value={searchFields[0]}
              onChange={onChangeSearchField}
              className="text-left"
            >
              {fields.map(option =>
                <MenuItem
                  key={option.path}
                  value={option.path}
                  primaryText={option.path.replace(/\.dataobj\./gi, '.').replace(/dataobj\./gi, '')}
                />
              )}
            </SelectField>
          </div>
          <div style={{height: '500px', overflow: 'auto'}}>
            <table className="table table-hover dataTable">
              <tbody>
              {this.renderItems()}
              </tbody>
            </table>
          </div>
          <CloseButton onClose={onHide} />
        </div>
      </Modal>
    )
  }
}
