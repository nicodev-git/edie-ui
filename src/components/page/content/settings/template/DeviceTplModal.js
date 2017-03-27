import React from 'react'
import Modal from 'react-bootstrap-modal'
import { reduxForm, Field } from 'redux-form'
import { assign } from 'lodash'
import { connect } from 'react-redux'

import { getCustomImageUrl, extImageBaseUrl } from 'shared/Global'

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

    if (selectedTplImage) tpl.image = selectedTplImage.uuid

    if (deviceTpl) { this.props.updateDeviceTemplate(tpl) } else {
      this.props.addDeviceTemplate(tpl)
    }
  }

  renderMonitors () {
    return (
      <div>
        <table className="table table-hover dataTable">
          <tbody>
          {
            this.state.monitors.map((item, index) =>
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <a href="javascript:;" onClick={this.onClickRemoveMonitor.bind(this, index)}>
                    <i className="fa fa-trash-o" />
                  </a>
                </td>
              </tr>)
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
                    <i className="fa fa-plus-square" />
                  </a>
                </td>
              </tr>)
          }
          </tbody>
        </table>
      </div>
    )
  }

  getImageUrl () {
    const {selectedTplImage, deviceTpl} = this.props
    let imgUrl = ''
    if (selectedTplImage) {
      imgUrl = getCustomImageUrl(selectedTplImage)
    } else if (deviceTpl && deviceTpl.image) {
      imgUrl = extImageBaseUrl + deviceTpl.image
    }
    return imgUrl
  }

  onClickClose () {
    this.props.closeDeviceTplModal()
  }

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

  onClickChangeImage () {
    this.props.openTplImageModal()
  }

  renderOptions () {
    let categories = this.props.deviceCategories
    let options = categories.map(m => ({value: m.name, label: m.name}))
    return options
  }

  render () {
    const { handleSubmit } = this.props
    let header = 'Device Template'
    let imgUrl = this.getImageUrl()
    let options = this.renderOptions()
    return (
      <DeviceTplModalView
        show
        header={header}
        monitors={this.state.monitors}
        monitorTemplates={this.props.monitorTemplates}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onHide={this.onClickClose.bind(this)}
        imgUrl={imgUrl}
        onChange={this.onClickChangeImage.bind(this)}
        onAddMonitor={this.onClickAddMonitor.bind(this)}
        onRemoveMonitor={this.onClickRemoveMonitor.bind(this)}
      />
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
            <fieldset className="form-group">
              <label className="col-md-3 margin-sm-top">Group:</label>
              <div className="col-md-9">
                <Field name="devicetemplategroup" component="select" className="form-control">
                  {this.props.deviceCategories.map(m =>
                    <option key={m.name}>{m.name}</option>
                  )}
                </Field>
              </div>
            </fieldset>

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

export default connect(
  state => ({
    initialValues: state.settings.deviceTpl || {}
  })
)(reduxForm({form: 'deviceTplEdit'})(DeviceTplModal))
