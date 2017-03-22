import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Header, TwoButtonsBlock } from './parts'

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
          <div className="dropdown-image">
            {images.map(item => (
              <div
                key={item.id}
                className={currentIcon.id === item.id ? 'active' : ''}
                onClick={onClickItem.bind(this, item)}>
                <img src={getCustomImageUrl(item)}/>
              </div>
            ))}
          </div>
          <a href="javascript:;" style={{position: 'relative', cursor: 'pointer'}} className="pull-left">
            Upload File
            <input
              type="file"
              name="file"
              onChange={onChangeFile}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: 0,
                padding: 0,
                fontSize: '20px',
                cursor: 'pointer',
                opacity: 0
              }}
            />
          </a>
          <TwoButtonsBlock onSave={onSave} onClose={onHide}/>
        </div>
      </Modal>
    )
  }
}
