import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import CreateIcon from 'material-ui/svg-icons/content/create'
import { SubHeader } from 'components/modal/parts'
import { buttonStyle, iconStyle } from 'style/common/materialStyles'

export default class WorkflowStep3 extends Component {
  render () {
    const {onAddAction, onEditAction, onRemoveAction, onActionClick, actions,
      selected, actionModal} = this.props
    return (
      <div>
        <div className="crud-buttons">
          <SubHeader name="Actions"/>
          <div className="add-button">
            <IconButton
              style={buttonStyle}
              iconStyle={iconStyle}
              onTouchTap={onAddAction}>
                <AddCircleIcon color="#545454"/>
            </IconButton>
          </div>
          <div className="edit-button">
            <IconButton
              style={buttonStyle}
              iconStyle={iconStyle}
              onTouchTap={onEditAction}>
                <CreateIcon color="#545454"/>
            </IconButton>
          </div>
          <div className="remove-button">
            <IconButton
              style={buttonStyle}
              iconStyle={iconStyle}
              onTouchTap={onRemoveAction}>
                <DeleteIcon color="#545454"/>
            </IconButton>
          </div>
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
                <tr key={index} className={selected === index ? 'selected' : ''} onClick={onActionClick.bind(this, index)}>
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
