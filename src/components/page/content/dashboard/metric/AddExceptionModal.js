import React from 'react'
import AddExceptionModalView from '../../../../modal'

export default class AddExceptionModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

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
