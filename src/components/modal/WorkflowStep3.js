import React, { Component } from 'react'

export default class WorkflowStep3 extends Component {
  render () {
    const {onAddAction, onEditAction, onRemoveAction, onActionClick, actions,
      selected, actionModal} = this.props
    return (
      <div>
        <div>
          <span className="margin-md-right"><b>Actions</b></span>
          <a href="javascript:;" onClick={onAddAction} className="margin-sm-right"><i className="fa fa-plus-square"/></a>
          <a href="javascript:;" onClick={onEditAction} className="margin-sm-right"><i className="fa fa-edit"/></a>
          <a href="javascript:;" onClick={onRemoveAction} className="margin-sm-right"><i className="fa fa-trash-o"/></a>
        </div>
        <div>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
            </thead>
            <tbody>
            {
              actions.map((a, index) =>
                <tr key={a.name} className={selected === index ? 'selected' : ''} onClick={onActionClick.bind(this, index)}>
                  <td>{a.name}</td>
                  <td>{a.actionType}</td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
        {actionModal}
      </div>
    )
  }
}
