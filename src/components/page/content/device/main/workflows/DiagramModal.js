import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-bootstrap-modal'
import DiagramPanel from './DiagramPanel'
import DiagramDragLayer from './DiagramDragLayer'
import DiagramDragItem from './DiagramDragItem'

import { workflowItems } from 'shared/Global'

const itemStyle = {
  width: '36px',
  height: '36px'
}

class DiagramModal extends React.Component {
  onHide () {

  }

  onClickClose () {
    this.props.closeDeviceWfDiagramModal()
  }

  onClickSave () {

  }

  // ////////////////////////////////////////////////////

  onDrop (item, offset, component) {
    console.log('Dropped.')

    const node = ReactDOM.findDOMNode(component)
    const rt = node.getClientRects()[0]

    const componentOffset = {
      x: offset.x - rt.left,
      y: offset.y - rt.top
    }

    console.log(componentOffset)
  }

  // ////////////////////////////////////////////////////

  renderSidebar () {
    return (
      <div style={{background: 'whiteSmoke'}}>
        {workflowItems.map((m, index) =>
          <DiagramDragItem key={index} imgIndex={index}>
            <svg style={itemStyle}>{m}</svg>
          </DiagramDragItem>
        )}
      </div>
    )
  }

  renderPanel () {
    return (
      <DiagramPanel onDrop={this.onDrop.bind(this)}/>
    )
  }

  renderDragLayer () {
    return (
      <DiagramDragLayer/>
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
          <div className="diagram">
            {this.renderDragLayer()}
            <div className="col-md-3">
              {this.renderSidebar()}
            </div>
            <div className="col-md-9">
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
