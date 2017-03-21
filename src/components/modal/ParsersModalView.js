import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Header, TwoButtonsBlock } from './parts'

export default class ParsersModalView extends Component {
  render () {
    const {show, onHide, data, selectedIndex, onClick, onSave} = this.props
    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name="Parsers" />
        <div className="modal-body bootstrap-dialog-message">
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Parser</th>
            </tr>
            </thead>
            <tbody>
            {
              data.map((item, i) =>
                <tr key={i}
                  className={selectedIndex === i ? 'selected' : ''}
                  onClick={onClick.bind(this, i)}>
                  <td>{item}</td>
                </tr>
              )
            }
            </tbody>
          </table>
          <TwoButtonsBlock onSave={onSave} onClose={onHide}/>
        </div>
      </Modal>
    )
  }
}
