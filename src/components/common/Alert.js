import React, { Component } from 'react'
import {appendComponent, removeComponent} from 'util/Component'
import { SubHeader, Modal } from '../modal/parts'
import {TextField, Button} from '@material-ui/core'
import { buttonStyle } from 'style/common/materialStyles'

const TYPE_ALERT = 'alert'
const TYPE_CONFIRM = 'confirm'
const TYPE_PROMPT = 'prompt'

export default class Alert extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,
      input: ''
    }
  }
  onKeyUp (e) {
    if (e.keyCode === 13) {
      this.onClickSave()
    }
  }

  onHide () {
    this.onClickClose()
  }

  onClickSave () {
    this.closeAlert('ok', this.state.input || '')
  }

  onClickClose () {
    this.closeAlert('cancel')
  }

  closeAlert (btn, result) {
    this.setState({ open: false }, () => {
      if (!this.props.onClose) return

      const {type} = this.props

      if (type === TYPE_ALERT) {
        this.props.onClose(this, btn)
      } else if (type === TYPE_PROMPT) {
        this.props.onClose(this, btn === 'ok' ? result : null)
      } else if (type === TYPE_CONFIRM) { this.props.onClose(this, btn) }
    })
  }

  render () {
    return (
      <Modal title={this.props.title} contentStyle={{width: 450}} onRequestClose={this.onClickClose.bind(this)}>
        <SubHeader name={this.props.message}/>
        <form>
        <div className={`form-column ${this.props.type === TYPE_PROMPT ? '' : 'hidden'}`}>
          <TextField
            name="input"
            value={this.state.input}
            onChange={e => this.setState({input: e.target.value})}
            onKeyUp={this.onKeyUp.bind(this)}
          />
        </div>
        <div className="form-buttons">
          <Button variant="raised"
            onClick={this.onClickSave.bind(this)}
            style={buttonStyle}>
            OK
          </Button>

        </div>
        </form>
      </Modal>
    )
  }
}

Alert.defaultProps = {
  title: 'Incident Manager',
  message: '',
  type: TYPE_ALERT,
  default: '',

  onClose: null
}

// /////////////////////////////////////////////////

function alertCallback (cb, modal, res) {
  setTimeout(() => {
    removeComponent(modal)
  }, 100)
  cb && cb(res)
}

export function showAlert (msg, cb) {
  appendComponent(
    <Alert message={msg}
      onClose={alertCallback.bind(this, cb)}
    />
  )
}

export function showConfirm (msg, cb) {
  appendComponent(
    <Alert message={msg}
      type={TYPE_CONFIRM}
      onClose={alertCallback.bind(this, cb)}
    />
    )
}

export function showPrompt (msg, initial, cb) {
  appendComponent(
    <Alert message={msg}
      default={initial}
      type={TYPE_PROMPT}
      onClose={alertCallback.bind(this, cb)}
    />
    )
}
