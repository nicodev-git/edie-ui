import React from 'react'
import Modal from 'react-bootstrap-modal'
import { findIndex } from 'lodash'

class SysWorkflowsModal extends React.Component {
  componentWillMount () {
    this.props.fetchWorkflows()
  }

  onHide () {

  }

  onClickClose () {
    this.props.closeSysWorkflowsModal()
  }

  getSysWorkflows () {
    return this.props.sysWorkflows.filter(m => m.origin === 'SYSTEM')
  }

  onChangeCheck (workflow, e) {
    if (e.target.checked) {
      this.props.selectSysWorkflow(workflow)
    } else {
      this.props.deselectSysWorkflow(workflow)
    }
  }

  render () {
    return (
      <Modal
        show
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            System Workflows
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">
          <div style={{maxHeight: '300px', overflow: 'scroll'}}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Version</th>
                </tr>
              </thead>
              <tbody>
              {
                this.getSysWorkflows().map(w =>
                  <tr key={w.id}>
                    <td><label>
                      <input
                        type="checkbox"
                        checked={findIndex(this.props.selectedSysWorkflows, {id: w.id}) >= 0}
                        onChange={this.onChangeCheck.bind(this, w)}/>
                      &nbsp;{w.name}
                    </label></td>
                    <td>{w.desc}</td>
                    <td>{w.version}</td>
                  </tr>
                )
              }
              </tbody>
            </table>
          </div>
          <div className="text-right">
            <a href="javascript:;" className="btn btn-primary btn-sm margin-sm-right" type="submit">Add</a>
            <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Cancel</a>
          </div>
        </div>
      </Modal>
    )
  }
}

export default SysWorkflowsModal
