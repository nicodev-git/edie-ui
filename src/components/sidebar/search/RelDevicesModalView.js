import React from 'react'
import {Select, MenuItem} from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'

import { CloseButton, Modal, CardPanel } from 'components/modal/parts'

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
        <CardPanel title="Relevant Devices" className="margin-md-bottom">
          <div>
            <FormControl className="text-left">
              <InputLabel>Field</InputLabel>
              <Select value={searchFields[0]} onChange={onChangeSearchField}>
                {fields.map(option =>
                  <MenuItem key={option.path} value={option.path}>{option.path.replace(/\.dataobj\./gi, '.').replace(/dataobj\./gi, '')}</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
          <div style={{height: '500px', overflow: 'auto'}}>
            <table className="table table-hover dataTable">
              <tbody>
              {this.renderItems()}
              </tbody>
            </table>
          </div>
        </CardPanel>
        <CloseButton onClose={onHide} />
      </Modal>
    )
  }
}
