import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import { buttonStyle } from 'style/common/materialStyles'

export default class Monitors extends Component {
  render () {
    const {monitors, onRemoveMonitor, onEditMonitor} = this.props
    return (
      <div>
          <table className="table table-hover dataTable">
            <tbody>
            {
              monitors.map((item, index) =>
                <tr className="modal-row" key={item.id}>
                  <td className="table-label">{item.name}</td>
                  <td className="table-icon">
                    {onEditMonitor && <div className="edit-button">
                      <IconButton
                        style={buttonStyle}

                        onClick={onEditMonitor.bind(this, item)}>
                          <CreateIcon nativeColor="#d4d4d4"/>
                      </IconButton>
                    </div>}
                    {onEditMonitor && <div className="remove-button">
                      <IconButton
                        style={buttonStyle}

                        onClick={onRemoveMonitor.bind(this, index)}>
                          <DeleteIcon nativeColor="#d4d4d4"/>
                      </IconButton>
                    </div>}
                  </td>
                </tr>)
            }
            </tbody>
          </table>
      </div>
    )
  }
}
