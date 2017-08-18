import React, { Component } from 'react'
import { Field } from 'redux-form'
import {Chip} from 'material-ui'

import { SubmitBlock, FormInput, ImageUploader, FormCheckbox,
  Monitors, MonitorTemplates, Workflows, Modal, CardPanel } from 'components/modal/parts'
import { chipStyles } from 'style/common/materialStyles'

export default class DeviceTplModalView extends Component {
  renderContent () {
    const {imgUrl, onSubmit, onHide, onChange,
      monitors, monitorTemplates, onAddMonitor, onEditMonitor, onRemoveMonitor,
      workflows, showWfSelectModal, onClickDeleteWf,
      tagModal, tags, onClickAddTag, onClickDeleteTag
    } = this.props
    return (
      <form onSubmit={onSubmit}>
        <CardPanel className="margin-md-bottom">
          <div className="form-column mb-none">
            <Field name="name" component={FormInput} label="Name"/>
            <Field name="devicetemplategroup" component={FormInput} label="Group"/>
            <Field name="dashboard" component={FormCheckbox} label="Dashboard"/>
            <ImageUploader imgUrl={imgUrl} onChange={onChange}/>
          </div>

          <div style={chipStyles.wrapper}>
            <Chip style={chipStyles.chip} onTouchTap={onClickAddTag} className={onSubmit ? '' : 'hidden'}>
              <b>+</b>
            </Chip>
            {tags.map((t, i) =>
              <Chip key={i} style={chipStyles.chip} onRequestDelete={() => onClickDeleteTag(i)}>{t}</Chip>
            )}
          </div>
          <div className="margin-md-top flex-horizontal" style={{height: 250}}>
            <div className="flex-1">
              <div><b>Monitors</b></div>
              <Monitors monitors={monitors} onEditMonitor={onSubmit ? onEditMonitor : null} onRemoveMonitor={onSubmit ? onRemoveMonitor : null} />
              <Workflows workflows={workflows} showWfSelectModal={onSubmit ? showWfSelectModal : null} onClickDeleteWf={onSubmit ? onClickDeleteWf : null}/>
            </div>
            <div className="flex-1" style={{maxHeight: '200px', overflow: 'auto'}}>
              <MonitorTemplates monitors={monitors} monitorTemplates={monitorTemplates} onAddMonitor={onSubmit ? onAddMonitor : null} />
            </div>
          </div>
          {tagModal}
        </CardPanel>
        {onSubmit && <SubmitBlock name="Save" onClick={onHide}/>}
      </form>
    )
  }
  render () {
    const {header, innerView} = this.props
    if (innerView) return this.renderContent()
    return (
      <Modal title={header} onRequestClose={this.props.onHide}>
        {this.renderContent()}
      </Modal>
    )
  }
}
