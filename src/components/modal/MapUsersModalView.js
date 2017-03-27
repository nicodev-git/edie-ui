import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import { Header, CloseButton } from './parts'
import { buttonStyle, iconStyle } from 'style/materialStyles'

export default class MapUsersModalView extends Component {
  render () {
    const {show, header, table, usersModal, onHide, onAdd, onDelete} = this.props
    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name={header} />
        <div className="modal-body bootstrap-dialog-message" style={{minHeight: '400px'}}>
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
      </Modal>
    )
  }
}
