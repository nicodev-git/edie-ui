import React from 'react'
import Modal from 'react-bootstrap-modal'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import { findIndex, assign } from 'lodash'

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

  onChangeCheck (workflow, e, checked) {
    if (checked) {
      this.props.selectSysWorkflow(workflow)
    } else {
      this.props.deselectSysWorkflow(workflow)
    }
  }

  onClickAdd () {
    this.props.selectedSysWorkflows.forEach(workflow => {
      const props = assign({}, workflow, {id: null, isGlobal: false, origin: 'USER'})
      this.props.addDeviceWorkflow(props, this.props.device)
    })
  }

  render () {
    return (
      <Modal
        show
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary modal-w-9">
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
                  <th>Category</th>
                  <th>Version</th>
                </tr>
              </thead>
              <tbody>
              {
                this.getSysWorkflows().map(w =>
                  <tr key={w.id}>
                    <td>
                      <Checkbox
                        label={w.name}
                        checked={findIndex(this.props.selectedSysWorkflows, {id: w.id}) >= 0}
                        onCheck={this.onChangeCheck.bind(this, w)}
                      />
                    </td>
                    <td>{w.desc}</td>
                    <td>{w.category}</td>
                    <td>{w.version}</td>
                  </tr>
                )
              }
              </tbody>
            </table>
          </div>
          <div className="text-right">
            <FlatButton label="Cancel" primary onTouchTap={this.onClickClose.bind(this)}/>
            <FlatButton label="Add" primary onTouchTap={this.onClickAdd.bind(this)}/>
          </div>
        </div>
      </Modal>
    )
  }
}

export default SysWorkflowsModal
