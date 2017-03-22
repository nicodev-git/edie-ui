import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Header, TwoButtonsBlock, UploadFile } from './parts'

export default class ImageUploaderModalView extends Component {
  render () {
    const {show, onHide, images, currentIcon, getCustomImageUrl, onClickItem,
      onChangeFile, onSave} = this.props
    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name="Change Image" />
        <div className="modal-body bootstrap-dialog-message">
          <div className="dropdown-image images-list">
            {images.map(item => (
              <div
                key={item.id}
                className={currentIcon.id === item.id ? 'active' : ''}
                onClick={onClickItem.bind(this, item)}>
                <img src={getCustomImageUrl(item)}/>
              </div>
            ))}
          </div>
          <UploadFile onChangeFile={onChangeFile}/>
          <TwoButtonsBlock onSave={onSave} onClose={onHide}/>
        </div>
      </Modal>
    )
  }
}
