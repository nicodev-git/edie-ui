import React from 'react'
import { showAlert } from '../../../../../shared/Alert'
import { ROOT_URL } from '../../../../../../actions/config'
import { ParsersModalView } from '../../../../../modal'

export default class ParsersModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,

      data: [],

      selectedIndex: -1
    }
  }

  componentWillMount () {
    this.loadParsers()
  }

  loadParsers () {
    $.get(`${ROOT_URL}${Api.rule.getParsersForDevice}`, { // eslint-disable-line no-undef
      deviceid: this.props.device.id // eslint-disable-line no-undef
    }).done(res => {
      this.setState({
        data: res
      })
    })
  }

  openModal () {
    this.setState({
      open: true
    })
  }

  onHide (data) {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this, data)
    })
  }

  onTableClick (i) {
    this.setState({
      selectedIndex: i
    })
  }

  onClickSave () {
    if (this.state.selectedIndex < 0) {
      showAlert('Please select parser.')
      return
    }

    let parser = this.state.data[this.state.selectedIndex]

    this.onHide({parser})
  }

  render () {
    return (
      <ParsersModalView
        show={this.state.open}
        data={this.state.data}
        selectedIndex={this.state.selectedIndex}
        onHide={this.onHide.bind(this)}
        onSave={this.onClickSave.bind(this)}
        onClick={this.onTableClick.bind(this)}
      />
    )
  }
}

ParsersModal.defaultProps = {
  device: {},
  onClose: null
}
