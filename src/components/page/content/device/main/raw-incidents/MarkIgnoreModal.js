import React, { Component } from 'react'
import { ROOT_URL } from '../../../../../../actions/config'
import MarkIgnoreModalView from '../../../../../modal'

export default class MarkIgnoreModal extends Component {
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

  onClickSave () {
    $.get(`${ROOT_URL}${Api.rule.addIgnoreRuleForDevice}`, { // eslint-disable-line no-undef
      deviceid: this.props.device.id,
      name: this.refs.name.value,
      filter: this.refs.filter.value,
      severity: this.refs.severity.value
    }).done(res => {
      this.onHide(true)
    }).fail(() => {

    })
  }

  render () {
    return (
      <MarkIgnoreModalView
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        onClose={this.onClickClose.bind(this)}
        onSave={this.onClickSave.bind(this)}
        text={this.props.message}
      />
    )
  }
}

MarkIgnoreModal.defaultProps = {
  message: '',
  device: {},

  onClose: null
}
