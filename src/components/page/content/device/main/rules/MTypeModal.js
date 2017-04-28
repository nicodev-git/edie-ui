import React, { Component } from 'react'
import { validate } from '../../../../../modal/validation/NameValidation'
import SimpleModalContainer from 'containers/modal/SimpleModalContainer'

export default class MTypeModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

  onHide (data) {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this, data)
    })
  }

  onClickClose () {
    this.onHide()
  }

  onClickSave ({ type }) {
    let item = this.props.item || {
      result: ''
    }
    item.number = this.props.number
    item.value = type
    this.onHide(item)
  }

  render () {
    let header = 'Rule'
    let subheader = `M${this.props.number}`
    let options = [
      { value: 'Not Used', label: 'Not Used' },
      { value: 'Source IP', label: 'Source IP' },
      { value: 'Mac', label: 'Mac' },
      { value: 'Username', label: 'User Name' },
      { value: 'Destination IP', label: 'Destination IP' },
      { value: 'Severity', label: 'Severity' },
      { value: 'Message', label: 'Message' }
    ]
    let content = [
      {type: 'select', name: 'type', options: options}
    ]
    let initialType = this.props.item ? this.props.item.value : 'Not Used'
    let initialValues = {
      type: initialType
    }
    return (
      <SimpleModalContainer
        header={header}
        subheader={subheader}
        content={content}
        doAction={this.onClickSave.bind(this)}
        onClose={this.props.onClose}
        validate={validate}
        initialValues={initialValues}
      />
    )
  }
}

MTypeModal.defaultProps = {
  onClose: null,
  number: 1,
  item: null
}
