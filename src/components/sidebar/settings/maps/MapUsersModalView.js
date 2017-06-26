import React, { Component } from 'react'
import {Dialog} from 'material-ui'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import { CloseButton } from 'components/modal/parts'
import { buttonStyle, iconStyle } from 'style/common/materialStyles'

export default class MapUsersModalView extends Component {
  render () {
    const {header, table, usersModal, onHide, onAdd, onDelete} = this.props
    return (
      <Dialog open title={header} onRequestClose={onHide}>
        <div style={{minHeight: '400px'}}>
          <div className="panel panel-default panel-noborder">
            <div className="crud-buttons">
              <div className="add-button">
                <IconButton
                  style={buttonStyle}
                  iconStyle={iconStyle}
                  onTouchTap={onAdd}>
                    <AddCircleIcon color="#545454"/>
                </IconButton>
              </div>
              <div className="remove-button">
                <IconButton
                  style={buttonStyle}
                  iconStyle={iconStyle}
                  onTouchTap={onDelete}>
                    <DeleteIcon color="#545454"/>
                </IconButton>
              </div>
            </div>
            <div className="panel-body">
              {table}
            </div>
          </div>
          {usersModal}
        </div>
        <CloseButton onClose={onHide} />
      </Dialog>
    )
  }
}
