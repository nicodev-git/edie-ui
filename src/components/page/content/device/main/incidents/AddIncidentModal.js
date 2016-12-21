import React from 'react'
import Modal from 'react-bootstrap-modal'
import { connect } from 'react-redux'

import { closeAddDeviceIncident, addDeviceIncident } from '../../../../../../actions'

class AddIncidentModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
            <Modal show onHide={this.onHide.bind(this)}
              aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">
                <div className="modal-header">
                    <h4 className="modal-title bootstrap-dialog-title">
                        Add Incident
                    </h4>
                    <div className="bootstrap-dialog-close-button">
                        <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
                    </div>
                </div>
                <div className="modal-body bootstrap-dialog-message">
                    <div className="row margin-md-bottom">
                        <label className="col-md-3">Name:</label>
                        <div className="col-md-9">
                            <input type="text" className="form-control" ref="name"/>
                        </div>
                    </div>

                    <div className="row margin-md-bottom">
                        <label className="col-md-3">Description:</label>
                        <div className="col-md-9">
                            <textarea className="form-control" style={{height: '150px'}} ref="desc" />
                        </div>
                    </div>

                    <div className="row margin-md-bottom">
                        <label className="col-md-3">Severity:</label>
                        <div className="col-md-9">
                            <select className="form-control" ref="severity">
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                                <option value="AUDIT">Audit</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-right mb-none">
                        <a href="javascript:;" className="btn btn-primary btn-sm"
                          onClick={this.onClickSave.bind(this)}>Add Incident</a>
                        <a href="javascript:;" className="btn btn-default btn-sm margin-sm-left"
                          onClick={this.onClickClose.bind(this)}>Cancel</a>
                    </div>
                </div>
            </Modal>
    )
  }

  onHide () {
  }

  onClickClose () {
    this.props.closeAddDeviceIncident()
  }

    // /////////////////////////////////////////////////////////////////////////////////////////////////

  onClickSave () {
    this.props.addDeviceIncident({
      deviceid: this.props.device.id,
      name: this.refs.name.value,
      description: this.refs.desc.value,
      category: 'simulation',
      severity: this.refs.severity.value,
      acknowledged: 0,
      startTimestamp: new Date().getTime(),
      fixed: 0
    })
  }
}

function mapStateToProps (state) {
  return {
    device: state.dashboard.selectedDevice
  }
}

export default connect(mapStateToProps, { closeAddDeviceIncident, addDeviceIncident })(AddIncidentModal)
