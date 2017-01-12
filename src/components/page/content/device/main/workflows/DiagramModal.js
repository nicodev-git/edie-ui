import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-bootstrap-modal'
import DiagramPanel from './DiagramPanel'
import DiagramDragLayer from './DiagramDragLayer'
import DiagramDragItem from './DiagramDragItem'
import DiagramToolbar from './DiagramToolbar'

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
    const node = ReactDOM.findDOMNode(component)
    const rt = node.getClientRects()[0]

    const w = 80
    const h = 50
    const object = {
      imgIndex: item.imgIndex,

      x: offset.x - rt.left - w / 2,
      y: offset.y - rt.top - h / 2,
      w,
      h,

      id: this.props.lastId + 1
    }

    this.props.addDiagramObject(object)
  }

  // ////////////////////////////////////////////////////

  renderToolbar () {
    return (
      <DiagramToolbar/>
    )
  }

  renderSidebar () {
    return (
      <div style={{background: 'whiteSmoke'}}>
        <div style={{display: 'block'}}>
          <div className="geSidebar" style={{boxSizing: 'border-box', overflow: 'hidden', width: '100%', padding: '14px 8px 0px'}}>
            <div style={{whiteSpace: 'nowrap', textOverflow: 'clip', paddingBottom: '8px', cursor: 'default'}}>
              <input placeholder="Search Shapes" type="text"
                style={{fontSize: '12px', overflow: 'hidden', boxSizing: 'border-box', border: '1px solid rgb(213, 213, 213)', borderRadius: '4px', width: '100%', outline: 'none', padding: '6px 20px 6px 6px'}} />
                <img src="/images/search2.png" style={{position: 'relative', left: '-18px', top: '1px'}} />
            </div>
          </div>
        </div>

        <a href="javascript:void(0);" className="geTitle">General</a>
        <div className="padding-sm-top">
          {workflowItems.map((m, index) =>
            <DiagramDragItem key={index} imgIndex={index}>
              <svg style={itemStyle}>{m}</svg>
            </DiagramDragItem>
          )}
        </div>
      </div>
    )
  }

  renderPanel () {
    return (
      <DiagramPanel
        {...this.props}
        onDrop={this.onDrop.bind(this)}/>
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
        <div className="modal-body bootstrap-dialog-message p-none">
          <div className="diagram">
            {this.renderDragLayer()}

            {this.renderToolbar()}
            <div className="col-md-3 p-none">
              {this.renderSidebar()}
            </div>
            <div className="col-md-9 p-none">
              {this.renderPanel()}
            </div>
          </div>

          <div className="text-right panel-footer">
            <a href="javascript:;" className="btn btn-primary btn-sm margin-sm-right" onClick={this.onClickSave.bind(this)}>OK</a>
            <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Cancel</a>
          </div>
        </div>
      </Modal>
    )
  }
}

export default DiagramModal
