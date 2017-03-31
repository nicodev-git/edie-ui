import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Field } from 'redux-form'
import { Header, SubHeader, SubmitBlock, FormInput, FormSelect, ImageUploader,
  Monitors, MonitorTemplates } from './parts'

export default class DeviceTplModalView extends Component {
  render () {
    const {show, header, options, imgUrl, onSubmit, onHide, onChange,
      monitors, monitorTemplates, onAddMonitor, onEditMonitor, onRemoveMonitor} = this.props
    console.log('monitors: ', monitors)
    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name={header} />
        <div className="modal-body bootstrap-dialog-message">
          <form onSubmit={onSubmit}>
            <div className="form-column">
              <div>
                <Field name="name" component={FormInput} label="Name"/>
                <Field name="devicetemplategroup" component={FormSelect} label="Group" options={options}/>
                <ImageUploader imgUrl={imgUrl} onChange={onChange}/>
                <div className="subheader-wrapper">
                  <SubHeader name="Monitors"/>
                </div>
              </div>
              <div>
                <div className="col-md-6 modal-left">
                  <Monitors monitors={monitors} onEditMonitor={onEditMonitor}
                    onRemoveMonitor={onRemoveMonitor} />
                </div>
                <div className="col-md-6 modal-right">
                  <MonitorTemplates monitors={monitors} monitorTemplates={monitorTemplates}
                    onAddMonitor={onAddMonitor} />
                </div>
              </div>
            </div>
            <SubmitBlock name="Save" onClick={onHide}/>
          </form>
        </div>
      </Modal>
    )
  }
}
