import React, { Component } from 'react'

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
                  <a href="javascript:;" onClick={onRemoveMonitor.bind(this, index)}>
                    <i className="fa fa-trash-o" />
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
