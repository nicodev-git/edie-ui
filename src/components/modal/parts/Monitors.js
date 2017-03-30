import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import { buttonStyle, smallIconStyle } from '../../../style/materialStyles'

export default class Monitors extends Component {
  render () {
    const {monitors, onRemoveMonitor} = this.props
    return (
      <div>
        <table className="table table-hover dataTable">
          <tbody>
          {
            monitors.map((item, index) =>
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <div className="remove-button">
                    <IconButton
                      style={buttonStyle}
                      iconStyle={smallIconStyle}
                      onTouchTap={onRemoveMonitor.bind(this, index)}>
                        <DeleteIcon color="#545454"/>
                    </IconButton>
                  </div>
                  {/* <a href="javascript:;" onClick={onRemoveMonitor.bind(this, index)}>
                    <i className="fa fa-trash-o" />
                  </a> */}
                </td>
              </tr>)
          }
          </tbody>
        </table>
      </div>
    )
  }
}
