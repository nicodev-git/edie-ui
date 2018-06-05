import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { buttonStyle } from 'style/common/materialStyles'

export default class MonitorTemplates extends Component {
  render () {
    const {monitors, monitorTemplates, onAddMonitor} = this.props
    return (
      <div>
        <table className="table table-hover dataTable">
          <tbody>{
            monitorTemplates.map((item, index) =>
              <tr className="modal-row" key={item.id}>
                <td className="table-label">{item.name}</td>
                <td className="table-icon">
                  {onAddMonitor && <div className={`add-button ${monitors.includes(item) ? 'hidden' : ''}`}>
                    <IconButton
                      style={buttonStyle}

                      onClick={onAddMonitor.bind(this, item)}>
                        <AddCircleIcon nativeColor="#d4d4d4"/>
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
