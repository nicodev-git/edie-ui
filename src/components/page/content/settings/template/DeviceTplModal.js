import React from 'react'
import Modal from 'react-bootstrap-modal'
import { reduxForm, Field } from 'redux-form'
import {connect} from 'react-redux'
import {assign} from 'lodash'

import { extImageBaseUrl } from '../../../../../shared/Global'

import {
    addDeviceTemplate,
    updateDeviceTemplate,
    closeDeviceTplModal,
    openTplImageModal
} from '../../../../../actions'

const Input = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset className="form-group">
        <label className="col-md-3 margin-sm-top">{label}</label>
        <div className="col-md-9">
            <input {...input} className="form-control" type={type}/>
            {touched && error && <span className="error">{error}</span>}
        </div>
    </fieldset>
)

class DeviceTplModal extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor (props) {
    super(props)
    this.state = {
      monitors: props.deviceTpl ? props.deviceTpl.monitors : []
    }
  }

  handleFormSubmit (formProps) {
    const {deviceTpl, selectedTplImage} = this.props
    const tpl = assign({}, (deviceTpl || {}), formProps, {
      monitors: this.state.monitors
    })

    if (selectedTplImage) tpl.image = selectedTplImage.filename

    if (deviceTpl) { this.props.updateDeviceTemplate(tpl) } else {
      this.props.addDeviceTemplate(tpl)
    }
  }

  renderMonitors () {
    return (
            <div>
                <table className="table table-hover dataTable">
                    <tbody>{
                        this.state.monitors.map((item, index) =>
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    <a href="javascript:;" onClick={this.onClickRemoveMonitor.bind(this, index)}>
                                        <i className="fa fa-trash-o" /></a>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
    )
  }

  renderMonitorTemplates () {
    return (
            <div>
                <table className="table table-hover dataTable">
                    <tbody>{
                        this.props.monitorTemplates.map(item =>
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    <a href="javascript:;" onClick={this.onClickAddMonitor.bind(this, item)}>
                                        <i className="fa fa-plus-square" /></a>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
    )
  }

  renderImageUploader () {
    const {selectedTplImage, deviceTpl} = this.props
    let imgUrl = ''
    if (selectedTplImage) imgUrl = selectedTplImage.url
    else if (deviceTpl && deviceTpl.image) imgUrl = extImageBaseUrl + deviceTpl.image
    return (
            <fieldset className="form-group">
                <label className="col-md-3 margin-sm-top">Image:</label>
                <div className="col-md-9">
                    <img className="file-preview" src={imgUrl}/>
                    <a href="javascript:;" className="margin-sm-left"
                      style={{position: 'relative', cursor: 'pointer'}}
                      onClick={this.onClickChangeImage.bind(this)}>
                        Change
                    </a>
                </div>
            </fieldset>
    )
  }

    // ///////////////////////////////////////////////////////////

  onHide () {

  }

  onClickClose () {
    this.props.closeDeviceTplModal()
  }

    // ////////////////////////////////////////////////////////////

  onClickAddMonitor (item) {
    let {monitors} = this.state
    monitors.push(item)
    this.setState({monitors})
  }

  onClickRemoveMonitor (index) {
    let {monitors} = this.state
    monitors.splice(index, 1)
    this.setState({monitors})
  }

    // /////////////////////////////////////////////////////////////

  onClickChangeImage () {
    this.props.openTplImageModal()
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <Modal
        show
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Device Template
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">

          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <Field label="Name:" name="name" component={Input} type="text"/>
            {this.renderImageUploader()}

            <label>Monitors</label>
            <div className="row">
              <div className="col-md-6">
                {this.renderMonitors()}
              </div>
              <div className="col-md-6">
                {this.renderMonitorTemplates()}
              </div>
            </div>

            <div className="text-right p-none">
              <button action="submit" className="btn btn-primary btn-sm margin-sm-right">Save</button>
              <a href="javascript:;" className="btn btn-default btn-sm"
                onClick={this.onClickClose.bind(this)}>Close</a>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

function mapStateToProps (state) {
  return {
    monitorTemplates: state.settings.monitorTemplates,
    deviceTpl: state.settings.deviceTpl,
    selectedTplImage: state.settings.selectedTplImage,

    initialValues: state.settings.deviceTpl || {}
  }
}

const actions = {
  addDeviceTemplate,
  updateDeviceTemplate,
  closeDeviceTplModal,
  openTplImageModal
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: 'deviceTplEdit'
    /* validate */
  })(DeviceTplModal)
)
