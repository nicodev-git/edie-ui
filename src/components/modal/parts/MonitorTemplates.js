import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import { buttonStyle, smallIconStyle } from '../../../style/materialStyles'

export default class MonitorTemplates extends Component {
  render () {
    const {monitorTemplates, onAddMonitor} = this.props
    return (
      <div>
        <table className="table table-hover dataTable">
          <tbody>{
            monitorTemplates.map((item, index) =>
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <div className="add-button">
                    <IconButton
                      style={buttonStyle}
                      iconStyle={smallIconStyle}
                      onTouchTap={onAddMonitor.bind(this, index)}>
                        <AddCircleIcon color="#545454"/>
                    </IconButton>
                  </div>
                  {/* <a href="javascript:;" onClick={onAddMonitor.bind(this, item)}>
                    <i className="fa fa-plus-square" />
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
