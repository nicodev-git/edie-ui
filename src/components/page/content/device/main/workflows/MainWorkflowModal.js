import React from 'react'
import Modal from 'react-bootstrap-modal'
import {reduxForm, Field} from 'redux-form'
import {assign} from 'lodash'

class MainWorkflowModal extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      current: 1,
      steps: 2
    }
  }

  onHide () {

  }

  handleFormSubmit (values) {
    const {editWorkflow} = this.props
    let props = assign({}, editWorkflow, values)

    if (!props.name) return window.alert('Please type name.')

    if (editWorkflow) {
      this.props.updateDeviceWorkflow(props)
    } else {
      this.props.addDeviceWorkflow(props)
    }
  }

  onClickClose () {
    this.props.closeDeviceWorkflowModal()
  }

  onClickPrev () {

  }

  renderStep () {
    const {current} = this.state
    if (current === 1) {
      return (
        <div>

          <div className="row margin-md-bottom">
            <label className="col-md-3">Name</label>
            <div className="col-md-9">
              <Field name="name" component="input" className="form-control"/>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3">Description</label>
            <div className="col-md-9">
              <Field name="desc" component="input" className="form-control"/>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3">Present</label>
            <div className="col-md-9">
              <Field name="present" component="input" className="form-control"/>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3">Category</label>
            <div className="col-md-9">
              <Field name="category" component="input" className="form-control"/>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3">Severity</label>
            <div className="col-md-9">
              <Field name="severity" component="select" className="form-control">
                <option>HIGH</option>
                <option>MEDIUM</option>
                <option>LOW</option>
                <option>AUDIT</option>
                <option>IGNORE</option>
                <option>IGNOREDELETE</option>
                <option>DEVICE</option>
              </Field>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3">Enabled</label>
            <div className="col-md-9">
              <Field name="enable" component="input" type="checkbox"/>
            </div>
          </div>

          <div className="margin-md-bottom">
            <table className="table table-hover">

            </table>
          </div>

          <div>
            <div className="text-right">
              <button className="btn btn-primary margin-sm-right" type="submit">OK</button>
              <a href="javascript:;" className="btn btn-default" onClick={this.onClickClose.bind(this)}>Cancel</a>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  renderWizard () {
    const {current, steps} = this.state

    let markers = []
    for (let i = 0; i < steps; i++) {
      const cls = `marker ${current >= (i + 1) ? 'marker-checked' : ''}`
      markers.push(
        <div key={i} className={cls} style={{left: `${100 / steps * (i + 0.5)}%`}}>
          <div className="marker-label">{i + 1}</div>
        </div>
      )
    }

    return (
      <div>

        <div className="wizard-container m-none">
          <div className="wizard-progress hidden">
            {markers}

            <div className="progress progress-striped progress-xs" style={{margin: '10px 0'}}>
              <div className="progress-bar" style={{width: `${current * 100 / steps}%`}} />
            </div>
          </div>
          {this.renderStep()}

          <div className="text-right mb-none">
            <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right"
              onClick={this.onClickClose.bind(this)}>Cancel</a>
            <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right"
              disabled={current === 1}
              onClick={this.onClickPrev.bind(this)}>Previous</a>

            { current < steps ? <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickNext.bind(this)}>Next</a> : null}
            { current === steps ? <button className="btn btn-primary btn-sm" type="submit">Finish</button> : null}

          </div>
        </div>
      </div>
    )
  }

  render () {
    const {handleSubmit} = this.props

    return (
      <Modal
        show={true}
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Workflow
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            { this.renderWizard() }
          </form>
        </div>
      </Modal>

    )
  }
}

export default reduxForm({form: 'workflowForm'})(MainWorkflowModal)
