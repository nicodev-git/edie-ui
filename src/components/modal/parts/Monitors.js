import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
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
                  <IconButton
                    style={buttonStyle}
                    iconStyle={smallIconStyle}
                    onTouchTap={onRemoveMonitor.bind(this, index)}>
                      <AddCircleIcon color="#545454"/>
                  </IconButton>
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
