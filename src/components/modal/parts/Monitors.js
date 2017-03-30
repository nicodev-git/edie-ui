import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import { buttonStyle, iconStyle } from '../../../style/materialStyles'

export default class Monitors extends Component {
  render () {
    const {monitors, onRemoveMonitor} = this.props
    return (
      <div>
        <table className="table table-hover dataTable">
          <tbody>
          {
            monitors.map((item, index) =>
              <tr className="modal-row" key={item.id}>
                <td className="table-label">{item.name}</td>
                <td className="table-icon">
                  <div className="remove-button">
                    <IconButton
                      style={buttonStyle}
                      iconStyle={iconStyle}
                      onTouchTap={onRemoveMonitor.bind(this, index)}>
                        <DeleteIcon color="#545454"/>
                    </IconButton>
                  </div>
                </td>
              </tr>)
          }
          </tbody>
        </table>
      </div>
    )
  }
}
