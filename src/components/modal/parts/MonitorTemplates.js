import React, { Component } from 'react'

export default class MonitorTemplates extends Component {
  render () {
    const {monitorTemplates, onAddMonitor} = this.props
    return (
      <div>
        <table className="table table-hover dataTable">
          <tbody>{
            monitorTemplates.map(item =>
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <a href="javascript:;" onClick={onAddMonitor.bind(this, item)}>
                    <i className="fa fa-plus-square" />
                  </a>
                </td>
              </tr>)
          }
          </tbody>
        </table>
      </div>
    )
  }
}
