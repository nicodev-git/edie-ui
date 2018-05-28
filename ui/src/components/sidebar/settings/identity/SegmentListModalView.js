import React, { Component } from 'react'
import InfiniteTable from 'components/common/InfiniteTable'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CreateIcon from '@material-ui/icons/Create'
import { CloseButton, Modal, CardPanel } from 'components/modal/parts'
import { buttonStyle } from 'style/common/materialStyles'

export default class SegmentListModalView extends Component {
  render () {
    const {onHide, cells, onAdd, onEdit, onDelete} = this.props
    return (
      <Modal title="Segments" onRequestClose={onHide}>
        <CardPanel title="Segments" className="margin-md-bottom">
          <div className="panel panel-default">
            <div>
              <IconButton
                style={buttonStyle}
                
                onClick={onAdd}>
                  <AddCircleIcon nativeColor="#545454"/>
              </IconButton>
              <IconButton
                style={buttonStyle}
                
                onClick={onEdit}>
                  <CreateIcon nativeColor="#545454"/>
              </IconButton>
              <IconButton
                style={buttonStyle}
                
                onClick={onDelete}>
                  <DeleteIcon nativeColor="#545454"/>
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
        </CardPanel>
        <CloseButton onClose={onHide}/>
      </Modal>
    )
  }
}
