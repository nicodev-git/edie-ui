import React from 'react'
import Modal from 'react-bootstrap-modal'
import { showAlert } from '../../../../../shared/Alert'
import { ROOT_URL } from '../../../../../../actions/config'

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

    // //////////////////////////////////////////

  loadParsers () {
    $.get(`${ROOT_URL}${Api.rule.getParsersForDevice}`, { // eslint-disable-line no-undef
      deviceid: this.props.device.id // eslint-disable-line no-undef
    }).done(res => {
      this.setState({
        data: res
      })
    })
  }

    // //////////////////////////////////////////

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

  onClickClose () {
    this.onHide()
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
      <Modal show={this.state.open} onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Parsers
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Parser</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.data.map((item, i) =>
                <tr key={i}
                  className={this.state.selectedIndex === i ? 'selected' : ''}
                  onClick={() => { this.setState({selectedIndex: i}) }}>
                  <td>{item}</td>
                </tr>
              )
            }
            </tbody>
          </table>
          <div className="text-right p-none">
            <a href="javascript:;" className="btn btn-primary btn-sm margin-sm-right" onClick={this.onClickSave.bind(this)}>OK</a>
            <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Cancel</a>
          </div>
        </div>
      </Modal>
    )
  }
}

ParsersModal.defaultProps = {
  device: {},

  onClose: null
}
