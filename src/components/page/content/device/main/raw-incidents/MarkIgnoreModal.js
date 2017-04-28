import React, { Component } from 'react'
import { validate } from '../../../../../modal/validation/NameValidation'
import { ROOT_URL } from 'actions/config'
import SimpleModalContainer from 'containers/modal/SimpleModalContainer'

export default class MarkIgnoreModal extends Component {

  onClickSave () {
    $.get(`${ROOT_URL}${Api.rule.addIgnoreRuleForDevice}`, { // eslint-disable-line no-undef
      deviceid: this.props.device.id,
      name: this.refs.name.value,
      filter: this.refs.filter.value,
      severity: this.refs.severity.value
    }).done(res => {
      this.onHide()
    }).fail(() => {

    })
  }

  render () {
    let header = 'Mark as Ignored'
    let subheader = (this.props.message) ? (this.props.message) : ''
    let options = [
      { value: 'Ignore', label: 'Ignore' },
      { value: 'IgnoreDelete', label: 'IgnoreDelete' }
    ]
    let content = [
      {type: 'select', name: 'Severity', options: options},
      {name: 'Name'},
      {name: 'Filter'}
    ]
    return (
      <SimpleModalContainer
        header={header}
        subheader={subheader}
        content={content}
        doAction={this.onClickSave.bind(this)}
        onClose={this.props.onClose}
        validate={validate}
      />
    )
  }
}
