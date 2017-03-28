import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Header, CloseButton } from './parts'

export default class MonitorPickerView extends Component {
  render () {
    const {onHide, monitorTemplates, onClickItem, extImageBaseUrl} = this.props
    return (
      <Modal
        show
        onHide={onHide}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary">
        <Header name="Choose Monitor"/>
        <div className="modal-body bootstrap-dialog-message">
          <div className="monitor-types text-center">
            <ul>
              {
                monitorTemplates.map(item =>
                  <li key={item.id}>
                    <a href="javascript:;" onClick={onClickItem.bind(this, item)}>
                      <img src={`${extImageBaseUrl}${item.image}`}/>
                      <span>{item.name}</span>
                    </a>
                  </li>
                )
              }
            </ul>
          </div>
          <CloseButton onClose={onHide} />
        </div>
      </Modal>
    )
  }
}
