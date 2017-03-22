import React, { Component } from 'react'
import { SmallModalTable } from '../../../../../modal'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default class UsersModal extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  constructor (props) {
    super(props)

    this.state = {
      open: true
    }

    this.cells = [{
      'displayName': 'Name',
      'columnName': 'username'
    }, {
      'displayName': 'Email',
      'columnName': 'email'
    }]
  }

  getChildContext () {
    return {
      muiTheme: getMuiTheme()
    }
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
    // TODO
    /* let selected = this.refs.users.getSelected()
    if (!selected) return showAlert('Please select user.')
    this.closeModal(selected) */
    this.closeModal()
  }

  render () {
    let header = 'Users'
    let url = '/user/getUsers?gid='
    let params = {}
    return (
      <SmallModalTable
        show={this.state.open}
        onHide={this.onClickClose.bind(this)}
        params={params}
        cells={this.cells}
        header={header}
        url={url}
        row={{'key': 'id'}}
        height={400}
        save
        onSave={this.onClickSave.bind(this)}
      />
    )
  }

}

UsersModal.defaultProps = {
  onClose: null
}
