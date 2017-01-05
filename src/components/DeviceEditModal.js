import React from 'react'
import Modal from 'react-bootstrap-modal'
import { reduxForm, Field } from 'redux-form'
import { validate } from './DeviceValidation'

const Input = ({ input, label, type, meta: { touched, error } }) => (
  <fieldset className="form-group">
    <label className="col-md-3">{label}</label>
    <div className="col-md-9">
      <input {...input} className="form-control" type={type}/>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </fieldset>
)

class DeviceEditModal extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  handleFormSubmit (formProps) {
    const {device} = this.props
    if (device) {
      this.props.updateDevice(device._links.self.href, formProps)
    } else {
      this.props.addDevice('/device', formProps)
    }
  }

  renderError () {
    const {updateDeviceError} = this.props
    if (!updateDeviceError) return null
    return (
      <div className="alert alert-danger" role="alert">
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />
        <span className="sr-only">Error:</span>
        {updateDeviceError}
      </div>
    )
  }

  onHide () {

  }

  onClickClose () {
    this.props.closeDeviceEditModal()
  }

  onClickSave () {

  }

  onChangeProperty (prop, e) {
    let {device} = this.state
    device[prop] = e.target.value
    this.setState({ device })
  }

  render () {
    const { handleSubmit, device } = this.props

    return (
      <Modal show onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Device
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">

          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

            <Field label="Name:" name="name" component={Input} type="text" defaultValue={device ? device.name : ''}/>

            <Field label="LAN IP:" name="lanIP" component={Input} type="text" defaultValue={device ? device.lanIP : ''}/>

            {this.renderError()}

            <div className="text-right p-none">
              <button action="submit" className="btn btn-primary btn-sm margin-sm-right">Save</button>
              <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Close</a>
            </div>
          </form>

        </div>
      </Modal>
    )
  }
}

export default reduxForm({
  form: 'deviceEdit',
  validate
})(DeviceEditModal)
