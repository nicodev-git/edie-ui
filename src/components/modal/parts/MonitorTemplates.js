import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import { buttonStyle, iconStyle } from '../../../style/materialStyles'

export default class MonitorTemplates extends Component {
  render () {
    const {monitorTemplates, onAddMonitor} = this.props
    return (
      <div>
        <table className="table table-hover dataTable">
          <tbody>{
            monitorTemplates.map((item, index) =>
              <tr className="modal-row" key={item.id}>
                <td className="table-label">{item.name}</td>
                <td className="table-icon">
                  <div className="add-button">
                    <IconButton
                      style={buttonStyle}
                      iconStyle={iconStyle}
                      onTouchTap={onAddMonitor.bind(this, item)}>
                        <AddCircleIcon color="#d4d4d4"/>
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
