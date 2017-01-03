import React from 'react'
import Modal from 'react-bootstrap-modal'

import InfiniteTable from '../../../shared/InfiniteTable'
import { appendComponent, removeComponent } from '../../../../util/Component'

import CredentialEditModal from './CredentialEditModal'
import { showAlert, showConfirm } from '../../../shared/Alert'
import { ROOT_URL } from '../../../../actions/config'

export default class CredentialModal extends React.Component {
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

  onClickClose () {
    this.closeModal()
  }

  closeModal (data) {
    this.setState({ open: false }, () => {
      this.props.onClose &&
            this.props.onClose(this, data)
    })
  }

  refreshTable () {
    this.refs.table.refresh()
  }

    // ////////////////////////////////////////////////////////////////

  onClickAdd () {
    appendComponent(
      <CredentialEditModal onClose={modal => {
        removeComponent(modal)
        this.refreshTable()
      }}/>
    )
  }

  onClickEdit () {
    const selected = this.refs.table.getSelected()
    if (!selected) return showAlert('Please select credentionals.')

    appendComponent(
      <CredentialEditModal
        data={selected}
        onClose={modal => {
          removeComponent(modal)
          this.refreshTable()
        }}
      />
    )
  }

  onClickRemove () {
    const selected = this.refs.table.getSelected()
    if (!selected) return showAlert('Please select credentionals.')

    showConfirm('Click OK to remove.', (btn) => {
      if (btn !== 'ok') return

      $.get(`${ROOT_URL}${Api.devices.removeCredential}`, selected).done((res) => { // eslint-disable-line no-undef
        if (!res.success) {
          showAlert('Failed!')
          return
        }

        this.refreshTable()
      })
    })
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
            Credentials
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message p-none">
          <div className="panel panel-default panel-noborder">
            <div className="panel-heading">
              <a href="javascript:;" className="margin-xs-left" onClick={this.onClickAdd.bind(this)}>
                <i className="fa fa-x fa-plus-square" title="Add" /></a>
              <a href="javascript:;" className="margin-xs-left" onClick={this.onClickEdit.bind(this)}>
                <i className="fa fa-x fa-edit" title="Edit" /></a>
              <a href="javascript:;" className="margin-xs-left" onClick={this.onClickRemove.bind(this)}>
                <i className="fa fa-x fa-trash-o" title="Remove" /></a>
            </div>
            <div className="panel-body">
              <InfiniteTable
                url="/devices/getCredentials"
                cells={this.cells}
                rowMetadata={{'key': 'id'}}
                selectable
                bodyHeight={400}
                ref="table"
              />
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

CredentialModal.defaultProps = {
  onClose: null
}
