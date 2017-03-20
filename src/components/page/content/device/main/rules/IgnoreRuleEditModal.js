import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { showAlert } from '../../../../../shared/Alert'
import { ROOT_URL } from '../../../../../../actions/config'
import { validate } from '../../../../../modal/validation/NameValidation'
import SimpleModalContainer from '../../../../../../containers/modal/SimpleModalContainer'

export default class IgnoreRuleEditModal extends Component {
  constructor (props) {
    super(props)
  }

  onClickSave () {
    $.get(`${ROOT_URL}${Api.rule.updateARuleToADevice}`, { // eslint-disable-line no-undef
      deviceid: this.props.device.id,
      idrulesNew: this.props.rule.idrulesNew,
      ruleCategory: this.props.categoryId,
      name: this.refs.name.value,
      filter1: this.refs.filter.value,
      severity: this.refs.severity.value
    }).done(() => {
      this.onHide(true)
    }).fail(function (res) {
      showAlert('Failed to save.')
    })
  }

  render () {
    let rule = this.props.rule
    let header = 'Rule'
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
    let initialValues = {
      select: rule.severity,
      name: rule.name,
      filter: rule.prefilter1
    }
    return (
      <SimpleModalContainer
        header={header}
        content={content}
        doAction={this.onClickSave.bind(this)}
        onClose={this.props.onClose}
        validate={validate}
        initialValues={initialValues}
      />
    )
  }
}

IgnoreRuleEditModal.defaultProps = {
  open: false,
  rule: {},
  device: {},
  categoryId: 0,
  onClose: null
}
