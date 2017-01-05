import React from 'react'
import Modal from 'react-bootstrap-modal'
import { reduxForm, Field } from 'redux-form'
import { assign } from 'lodash'

import { extImageBaseUrl } from '../../../../../shared/Global'

const Input = ({ input, label, type, meta: { touched, error } }) => (
  <fieldset className="form-group">
    <label className="col-md-3 margin-sm-top">{label}</label>
    <div className="col-md-9">
      <input {...input} className="form-control" type={type}/>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </fieldset>
)

class MonitorTplModal extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor (props) {
    super(props)
    this.state = { }
  }

  handleFormSubmit (formProps) {
    const {monitorTpl, selectedTplImage} = this.props
    const tpl = assign({}, (monitorTpl || {}), formProps)

    if (selectedTplImage) tpl.image = selectedTplImage.filename

    if (monitorTpl) {
      this.props.updateMonitorTemplate(tpl)
    } else {
      this.props.addMonitorTemplate(tpl)
    }
  }

  renderImageUploader () {
    const {selectedTplImage, monitorTpl} = this.props
    let imgUrl = ''
    if (selectedTplImage) imgUrl = selectedTplImage.url
    else if (monitorTpl && monitorTpl.image) imgUrl = extImageBaseUrl + monitorTpl.image
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

  onHide () {

  }

  onClickClose () {
    this.props.closeMonitorTplModal()
  }

  onClickChangeImage () {
    this.props.openTplImageModal()
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <Modal
        show onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Monitor Template
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">

          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

            <Field label="Name:" name="name" component={Input} type="text"/>
            <Field label="Type:" name="monitortype" component={Input} type="text"/>
            {this.renderImageUploader()}

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

export default reduxForm({
  form: 'monitorTplEdit'
  /* validate */
})(MonitorTplModal)
