import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Field } from 'redux-form'
import { Header, SubHeader, SubmitBlock, FormInput, FormSelect, ImageUploader,
  Monitors, MonitorTemplates, Workflows } from './parts'

export default class DeviceTplModalView extends Component {
  renderContent () {
    const {options, imgUrl, onSubmit, onHide, onChange,
      monitors, monitorTemplates, onAddMonitor, onEditMonitor, onRemoveMonitor,
      workflows, showWfSelectModal, onClickDeleteWf
    } = this.props
    return (
      <form onSubmit={onSubmit}>
        <div className="form-column padding-left-12 margin-bottom-0">
          <Field name="name" component={FormInput} label="Name"/>
          <Field name="devicetemplategroup" component={FormSelect} label="Group" options={options}/>
          <ImageUploader imgUrl={imgUrl} onChange={onChange}/>
          <div className="subheader-wrapper">
            <SubHeader name="Monitors"/>
          </div>
        </div>
        <div>
          <div className="col-md-6 modal-left">
            <Monitors monitors={monitors} onEditMonitor={onEditMonitor} onRemoveMonitor={onRemoveMonitor} />
            <Workflows workflows={workflows} showWfSelectModal={showWfSelectModal} onClickDeleteWf={onClickDeleteWf}/>
          </div>
          <div className="col-md-6 modal-right">
            <MonitorTemplates monitors={monitors} monitorTemplates={monitorTemplates} onAddMonitor={onAddMonitor} />
          </div>
        </div>
        <SubmitBlock name="Save" onClick={onHide}/>
      </form>
    )
  }
  render () {
    const {show, header, onHide, innerView} = this.props
    if (innerView) return this.renderContent()
    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name={header} />
        <div className="modal-body bootstrap-dialog-message">
          {this.renderContent()}
        </div>
      </Modal>
    )
  }
}
