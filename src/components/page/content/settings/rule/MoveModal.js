import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
    Button
} from 'react-bootstrap'

class MoveModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,
      categories: []
    }
  }

  componentWillMount () {
    $.get(Api.rule.getCategories).done(res => { // eslint-disable-line no-undef
      this.setState({ categories: res })
    })
  }

  onHide () {
    this.onClickClose()
  }

  closeModal (data) {
    this.setState({ open: false }, () => {
      this.props.onClose && this.props.onClose(this, data)
    })
  }

  onClickClose () {
    this.closeModal()
  }

    // ////////////////////////////////////////////////////////////////////////

  onClickMove () {
    this.closeModal(this.refs.category.value)
  }

  render () {
    return (
      <Modal
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Move Rule
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">
          <div className="row">
            <label className="col-md-2 col-md-offset-1 margin-xs-top">Category: </label>
            <div className="col-md-5">
              <select className="input-sm form-control" ref="category">
                {
                  this.state.categories.map(item =>
                    <option value={item.id} key={item.id}>{item.name}</option>
                  )
                }
              </select>
            </div>
            <div className="col-md-3">
              <Button className="btn-sm btn-primary" onClick={this.onClickMove.bind(this)}>Move</Button>
              <Button className="btn-sm margin-sm-left" onClick={this.onClickClose.bind(this)}>Cancel</Button>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

MoveModal.defaultProps = {}

export default MoveModal
