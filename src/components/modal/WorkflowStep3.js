import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CreateIcon from '@material-ui/icons/Create'
import { CardPanel } from 'components/modal/parts'

export default class WorkflowStep3 extends Component {
  renderTools () {
    const {onAddAction} = this.props
    return (
      <div>
        <IconButton onClick={onAddAction}>
          <AddCircleIcon nativeColor="#545454"/>
        </IconButton>
      </div>
    )
  }
  render () {
    const {onActionClick, actions,
      selected, actionModal,
      onEditAction, onRemoveAction
    } = this.props
    return (
      <CardPanel title="Actions" tools={this.renderTools()}>
        {this.renderTools()}
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {
            actions.map((a, index) =>
              <tr key={index}
                  className={selected === index ? 'selected' : ''}
                  onClick={onActionClick.bind(this, index)}>
                <td>{a.name}</td>
                <td>{a.actionType}</td>
                <td className="text-right">
                  <CreateIcon
                    nativeColor="#545454"
                    onClick={() => setTimeout(onEditAction, 1)}
                    className="link"
                  />
                  <DeleteIcon
                    nativeColor="#545454"
                    onClick={() => setTimeout(onRemoveAction, 1)}
                    className="link margin-sm-left"
                  />
                </td>
              </tr>
            )
          }
          </tbody>
        </table>
        {actionModal}
      </CardPanel>
    )
  }
}
