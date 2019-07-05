import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import { CloseButton, Modal, CardPanel } from 'components/modal/parts'
import { buttonStyle } from 'style/common/materialStyles'

export default class MapUsersModalView extends Component {
  render () {
    const {header, table, usersModal, onHide, onAdd, onDelete} = this.props
    return (
      <Modal title={header} onRequestClose={onHide}>
        <CardPanel className="margin-md-bottom">
          <div style={{minHeight: '400px'}}>
            <div className="panel panel-default panel-noborder">
              <div className="crud-buttons">
                <div className="add-button">
                  <IconButton
                    style={buttonStyle}

                    onClick={onAdd}>
                      <AddCircleIcon nativeColor="#545454"/>
                  </IconButton>
                </div>
                <div className="remove-button">
                  <IconButton
                    style={buttonStyle}

                    onClick={onDelete}>
                      <DeleteIcon nativeColor="#545454"/>
                  </IconButton>
                </div>
              </div>
              <div className="panel-body">
                {table}
              </div>
            </div>
            {usersModal}
          </div>
        </CardPanel>
        <CloseButton onClose={onHide} />
      </Modal>
    )
  }
}
