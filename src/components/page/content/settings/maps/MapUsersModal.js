import React from 'react'
import Modal from 'react-bootstrap-modal'
import { connect } from 'react-redux'

import { showAlert } from '../../../../shared/Alert'
import InfiniteTable from '../../../../shared/InfiniteTable'
import UsersModal from './UsersModal'
import { closeMapUsersModal, addMapUser, removeMapUser } from '../../../../../actions'

class MapUsersModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      usersModalVisible: false
    }

    this.cells = [{
      'displayName': 'User Name',
      'columnName': 'username'
    }, {
      'displayName': 'Full Name',
      'columnName': 'fullname'
    }]
  }

  render () {
    return (
            <Modal show onHide={this.onHide.bind(this)}
              aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

                <div className="modal-header">
                    <h4 className="modal-title bootstrap-dialog-title">
                        Map Users
                    </h4>
                    <div className="bootstrap-dialog-close-button">
                        <button className="close"
                          onClick={this.onClickClose.bind(this)}>×</button>
                    </div>
                </div>

                <div className="modal-body bootstrap-dialog-message p-none" style={{minHeight: '400px'}}>
                    <div className="panel panel-default panel-noborder">
                        <div className="panel-heading">
                            <a href="javascript:;" onClick={this.onClickAdd.bind(this)}>
                                <i className="fa fa-x fa-plus-square" title="Add" /></a>
                            <a href="javascript:;" className="margin-sm-left" onClick={this.onClickDelete.bind(this)}>
                                <i className="fa fa-x fa-trash-o" title="Remove" /></a>
                        </div>

                        <div className="panel-body">
                            {this.renderTable()}
                        </div>
                    </div>

                    {this.renderUsersModal()}
                </div>
            </Modal>
    )
  }

  renderTable () {
    return (
            <InfiniteTable
              cells={this.cells}
              ref="mapusers"
              rowMetadata={{'key': 'id'}}
              bodyHeight={400}
              selectable

              useExternal={false}
              data={this.props.mapUsers}
            />
    )
  }

  renderTable2 () {
    return (
            <InfiniteTable
              url="/map/getMapUsersDT"
              params={{
                mapId: this.props.map.id
              }}
              cells={this.cells}
              rowMetadata={{'key': 'id'}}
              selectable
              bodyHeight={400}
              ref="mapusers"
            />
    )
  }

  renderUsersModal () {
    if (!this.state.usersModalVisible) return null
    return (
            <UsersModal onClose={this.onSelectUser.bind(this)}/>
    )
  }

  onHide () {
    this.onClickClose()
  }

  closeModal (data) {
    this.props.closeMapUsersModal()
  }

  onClickClose () {
    this.closeModal()
  }

    // ////////////////////////////////////////////////

  onClickAdd () {
    this.setState({
      usersModalVisible: true
    })
  }

  onSelectUser (modal, user) {
    this.setState({
      usersModalVisible: false
    })

    if (!user) return

    this.props.addMapUser(this.props.editMap, user)
  }

  onClickDelete () {
    const user = this.refs.mapusers.getSelected()
    if (!user) return showAlert('Please select user')

    this.props.removeMapUser(this.props.editMap, user)
  }
}

MapUsersModal.defaultProps = {
}

function mapStateToProps (state) {
  return {
    editMap: state.settings.editMap,
    mapUsers: state.settings.mapUsers
  }
}

const actions = {
  closeMapUsersModal,
  addMapUser,
  removeMapUser
}

export default connect(mapStateToProps, actions)(MapUsersModal)
