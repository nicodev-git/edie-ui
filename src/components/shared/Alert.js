import React from 'react'
import Modal from 'react-bootstrap-modal'
import {appendComponent, removeComponent} from '../../util/Component'

const TYPE_ALERT = 'alert'
const TYPE_CONFIRM = 'confirm'
const TYPE_PROMPT = 'prompt'

class Alert extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

    // ////////////////////////////

  componentDidMount () {
        // const {type} = this.props

  }

    // ////////////////////////////

  onKeyUp (e) {
    if (e.keyCode === 13) {
      this.onClickSave()
    }
  }

    // ////////////////////////////
  onHide () {
    this.onClickClose()
  }

  onClickSave () {
    this.closeAlert('ok', this.refs.input.value || '')
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
      <Modal show={this.state.open} onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            {this.props.title}
          </h4>
        </div>

        <div className="modal-body bootstrap-dialog-message">

          <div className="row">
            <label className="col-md-12">{this.props.message}</label>

            <div className={`col-md-12 ${this.props.type === TYPE_PROMPT ? '' : 'hidden'}`}>
              <input type="text" className="form-control"
                defaultValue={this.props.default}
                onKeyUp={this.onKeyUp.bind(this)}
                ref="input"/>
            </div>
          </div>

          <div className="text-right margin-md-top">

            <a href="javascript:;" className="btn btn-primary btn-sm margin-sm-right"
              onClick={this.onClickSave.bind(this)}>OK</a>

            <a href="javascript:;"
              className={`btn btn-default btn-sm ${this.props.type === TYPE_ALERT ? 'hidden' : ''}`}
              onClick={this.onClickClose.bind(this)}>Cancel</a>

          </div>
        </div>
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

export function showAlert (msg, width, cb) {
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

