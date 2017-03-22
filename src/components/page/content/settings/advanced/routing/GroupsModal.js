import React, { Component } from 'react'
import { SmallModalTable } from '../../../../../modal'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default class GroupsModal extends Component {
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
    /* let selected = this.refs.groups.getSelected()
    if (!selected) return showAlert('Please select group.')
    this.closeModal(selected) */
    this.closeModal()
  }

  render () {
    let header = 'Groups'
    let url = '/group/getGroupsDT'
    let params = {}
    let save = true
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
        save={save}
        onSave={this.onClickSave.bind(this)}
      />
    )
  }
}

GroupsModal.defaultProps = {
  onClose: null
}
