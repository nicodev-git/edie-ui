import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import CreateIcon from 'material-ui/svg-icons/content/create'
import { CardPanel } from 'components/modal/parts'

export default class WorkflowStep3 extends Component {
  renderTools () {
    const {onAddAction} = this.props
    return (
      <div>
        <IconButton onTouchTap={onAddAction}>
          <AddCircleIcon color="#545454"/>
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
                    color="#545454"
                    onTouchTap={() => setTimeout(onEditAction, 1)}
                    className="link"
                  />
                  <DeleteIcon
                    color="#545454"
                    onTouchTap={() => setTimeout(onRemoveAction, 1)}
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
