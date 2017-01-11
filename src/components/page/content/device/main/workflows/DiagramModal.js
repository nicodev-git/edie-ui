import React from 'react'
import Modal from 'react-bootstrap-modal'

const items = [
  <g key="1"><g /><g><g transform="translate(0.5,0.5)"><rect x="2" y="10" width="31" height="16" fill="#ffffff" stroke="#000000"/></g></g><g/><g/></g>,
  <g key="2"><g /><g><g transform="translate(0.5,0.5)"><rect x="2" y="10" width="31" height="16" rx="2" ry="2" fill="#ffffff" stroke="#000000"/></g></g><g/><g/></g>,
  <g key="3"><g /><g><g transform="translate(0.5,0.5)"><ellipse cx="18" cy="18" rx="15.6" ry="10.4" fill="#ffffff" stroke="#000000"/></g></g><g/><g/></g>,
  <g key="4"><g /><g><g transform="translate(0.5,0.5)"><path d="M 18 2 L 34 18 L 18 34 L 2 18 Z" fill="#ffffff" stroke="#000000" strokeMiterlimit="10"/></g></g><g/><g/></g>,
  <g key="5"><g /><g><g transform="translate(0.5,0.5)"><path d="M 2 26 L 9 10 L 34 10 L 27 26 Z" fill="#ffffff" stroke="#000000" strokeMiterlimit="10"/></g></g><g/><g/></g>
]

class DiagramModal extends React.Component {
  onHide () {

  }

  onClickClose () {
    this.props.closeDeviceWfDiagramModal()
  }

  onClickSave () {

  }

  renderSidebar () {
    const itemStyle = {
      width: '36px',
      height: '36px'
    }
    return (
      <div style={{background: 'whiteSmoke'}}>
        {items.map((m, index) =>
          <a href="javascript:;" key={index} className="sidebar-item">
            <svg style={itemStyle}>
              {m}
            </svg>
          </a>
        )}
      </div>
    )
  }

  renderPanel () {
    return (
      <div className="draw-panel">

      </div>
    )
  }

  render () {
    return (
      <Modal
        show
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary modal-md">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Workflow
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">
          <div className="row diagram">
            <div className="col-md-3">
              General
              {this.renderSidebar()}
            </div>
            <div className="col-md-9">
              Panel
              {this.renderPanel()}
            </div>
          </div>
          <div className="text-right margin-md-top">
            <a href="javascript:;" className="btn btn-primary btn-sm margin-sm-right" onClick={this.onClickSave.bind(this)}>OK</a>
            <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Cancel</a>
          </div>
        </div>
      </Modal>
    )
  }
}

export default DiagramModal
