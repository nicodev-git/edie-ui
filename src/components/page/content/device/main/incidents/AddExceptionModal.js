import React from 'react'
import AddExceptionModalView from '../../../../../modal'

export default class AddExceptionModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: props.open
    }
  }

  openModal () {
    this.setState({
      open: true
    })
  }

  onHide (success) {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(success)
    })
  }

  onClickClose () {
    this.onHide()
  }

  onClickSave () {

  }

  render () {
    return (
      <AddExceptionModalView
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        onClose={this.onClickClose.bind(this)}
        onChange={this.onChangeFile.bind(this)}
        onSave={this.onClickSave.bind(this)}
        text={this.props.incident.rawtext}
      />
    )
  }
}

AddExceptionModal.defaultProps = {
  open: false,

  incident: {},
  onClose: null
}
