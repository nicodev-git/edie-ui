import React from 'react'
import Modal from 'react-bootstrap-modal'
import { connect } from 'react-redux'

import InfiniteTable from '../../../../shared/InfiniteTable'
import { showAlert } from '../../../../shared/Alert'

import { fetchSettingUsers } from '../../../../../actions/SettingsActions'

class UsersModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }

    this.cells = [{
      'displayName': 'Name',
      'columnName': 'username'
    }, {
      'displayName': 'Full Name',
      'columnName': 'fullname'
    }]
  }

  componentWillMount () {
    this.props.fetchSettingUsers()
  }

  onHide () {
    this.onClickClose()
  }

  closeModal (data) {
    this.props.onClose &&
        this.props.onClose(this, data)
  }

  onClickOK () {
    const user = this.refs.users.getSelected()
    if (!user) return showAlert('Please select user.')

    this.closeModal(user)
  }

  onClickClose () {
    this.closeModal()
  }

  render () {
    return (
      <Modal show onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Users
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close"
              onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message" style={{minHeight: '400px'}}>
          <InfiniteTable
            cells={this.cells}
            ref="users"
            rowMetadata={{'key': 'id'}}
            bodyHeight={400}
            selectable

            useExternal={false}
            data={this.props.users}
          />

          <div className="text-right">
            <a href="javascript:;" className="btn btn-primary margin-sm" onClick={this.onClickOK.bind(this)}>OK</a>
            <a href="javascript:;" className="btn btn-default" onClick={this.onClickClose.bind(this)}>Cancel</a>
          </div>
        </div>
      </Modal>
    )
  }

}

UsersModal.defaultProps = {
  onClose: null
}

function mapStateToProps (state) {
  return {
    users: state.settings.users
  }
}

const actions = {
  fetchSettingUsers
}

export default connect(mapStateToProps, actions)(UsersModal)
