import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { validate } from '../../../../modal/validation/NameValidation'
import AddExceptionModalView from '../../../../modal'

class AddExceptionModal extends Component {
  onClickSave() {

  }

  onHide (success) {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this, success)
    })
  }

  onClickClose () {
    this.onHide()
  }

  render () {
    return (
      <AddExceptionModalView
        show
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
  incident: {},
  onClose: null
}

export default connect(
  state => ({
    open: true
  }), {})(reduxForm({
    form: 'addExceptionModal',
    validate
  })(AddExceptionModal))
