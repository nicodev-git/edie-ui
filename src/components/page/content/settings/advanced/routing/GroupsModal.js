import React from 'react'

import Modal from 'react-bootstrap-modal'
import {
    Button
} from 'react-bootstrap'

import InfiniteTable from '../../../../../shared/InfiniteTable'
import { showAlert } from '../../../../../shared/Alert'

class GroupsModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: true
    }

    this.cells = [{
      'displayName': 'Name',
      'columnName': 'name'
    }, {
      'displayName': 'Description',
      'columnName': 'description'
    }]
  }

  onHide () {
    this.onClickClose()
  }

  closeModal (data) {
    this.setState({ open: false }, () => {
      this.props.onClose &&
            this.props.onClose(this, data)
    })
  }

  onClickClose () {
    this.closeModal()
  }

  onClickSave () {
    let selected = this.refs.groups.getSelected()
    if (!selected) return showAlert('Please select group.')

    this.closeModal(selected)
  }

  render () {
    return (
      <Modal
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Groups
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">

          <InfiniteTable
            url="/group/getGroupsDT"
            params={{}}
            cells={this.cells}
            rowMetadata={{'key': 'id'}}
            selectable
            bodyHeight={400}
            ref="groups"
          />

          <div className="text-right">
            <Button className="btn-primary btn-sm" onClick={this.onClickSave.bind(this)}>OK</Button>
            <Button className="btn-sm margin-sm-left" onClick={this.onClickClose.bind(this)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    )
  }
}

GroupsModal.defaultProps = {
  onClose: null
}

export default GroupsModal
