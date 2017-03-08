import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { validate } from '../../../../../modal/validation/NameValidation'
import { ROOT_URL } from '../../../../../../actions/config'
import { MarkIgnoreModalView } from '../../../../../modal'

class MarkIgnoreModal extends Component {

  handleFormSubmit ({name, filter, severity}) {
    console.log('form submitting')
    console.log('name: ', name)
    console.log('filter: ', filter)
    console.log('severity: ', severity)
    this.onHide()
  }

  onHide () {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this, true)
    })
  }

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
    const { handleSubmit } = this.props
    let text = (this.props.message) ? (this.props.message) : ''
    let options = [
      { value: 'Ignore', label: 'Ignore' },
      { value: 'IgnoreDelete', label: 'IgnoreDelete' }
    ]
    return (
      <MarkIgnoreModalView
        show={this.props.open}
        onHide={this.onHide.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        text={text}
        options={options}
      />
    )
  }
}

export default connect(
  state => ({
    open: true
  }), {})(reduxForm({
    form: 'markIgnoreModal',
    validate
  })(MarkIgnoreModal))
