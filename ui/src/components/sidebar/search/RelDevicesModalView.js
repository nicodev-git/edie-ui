import React from 'react'
import {SelectField, MenuItem} from 'material-ui'

import { CloseButton, Modal } from 'components/modal/parts'

export default class RelDevicesModalView extends React.Component {
  renderItems () {
    const {relDevices} = this.props
    return relDevices.map(d =>
      <tr key={`${d.path}${d.name}`}>
        <td>{d.name}</td>
        <td>{d.hostname}</td>
        <td>{d.country}</td>
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
      <Modal title="Relevant Devices" onRequestClose={onHide}>
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
      </Modal>
    )
  }
}
