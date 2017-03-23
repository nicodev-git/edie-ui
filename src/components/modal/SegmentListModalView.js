import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import InfiniteTable from '../shared/InfiniteTable'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import CreateIcon from 'material-ui/svg-icons/content/create'
import { Header, CloseButton } from './parts'
import { buttonStyle, iconStyle } from '../../style/materialStyles'

export default class SegmentListModalView extends Component {
  render () {
    const {show, onHide, cells, onAdd, onEdit, onDelete} = this.props
    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name="Segments" />
        <div className="modal-body bootstrap-dialog-message">
          <div className="panel panel-default">
            <div>
              <IconButton
                style={buttonStyle}
                iconStyle={iconStyle}
                onTouchTap={onAdd}>
                  <AddCircleIcon color="#545454"/>
              </IconButton>
              <IconButton
                style={buttonStyle}
                iconStyle={iconStyle}
                onTouchTap={onEdit}>
                  <CreateIcon color="#545454"/>
              </IconButton>
              <IconButton
                style={buttonStyle}
                iconStyle={iconStyle}
                onTouchTap={onDelete}>
                  <DeleteIcon color="#545454"/>
              </IconButton>
            </div>
            <div className="panel-body">
              <InfiniteTable
                url="/admin/getSegments"
                params={{}}
                cells={cells}
                rowMetadata={{'key': 'id'}}
                selectable
                bodyHeight={400}
              />
            </div>
          </div>
          <CloseButton onClose={onHide}/>
        </div>
      </Modal>
    )
  }
}
