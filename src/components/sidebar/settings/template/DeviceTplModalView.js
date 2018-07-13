import React, { Component } from 'react'
import { Field } from 'redux-form'
import {Chip} from '@material-ui/core'

import { SubmitBlock, FormInput, ImageUploader, FormCheckbox,
  Monitors, MonitorTemplates, Workflows, Modal, CardPanel } from 'components/modal/parts'
import { chipStyles } from 'style/common/materialStyles'

export default class DeviceTplModalView extends Component {
  renderContent () {
    const {imgUrl, onSubmit, onChange,
      monitors, monitorTemplates, onAddMonitor, onEditMonitor, onRemoveMonitor,
      workflows, showWfSelectModal, onClickDeleteWf,
      tagModal, tags, onClickAddTag, onClickDeleteTag
    } = this.props
    return (
      <form onSubmit={onSubmit}>
        <CardPanel title="Basic">
          <div className="form-column mb-none">
            <Field name="name" component={FormInput} label="Name"/>
            <Field name="devicetemplategroup" component={FormInput} label="Group"/>
            <Field name="dashboard" component={FormCheckbox} label="Dashboard" disabled={!onSubmit}/>
            <ImageUploader imgUrl={imgUrl} onChange={onSubmit ? onChange : null}/>
          </div>
        </CardPanel>
        <CardPanel title="Tags">
          <div style={chipStyles.wrapper}>
            <Chip
              style={chipStyles.chip}
              onClick={onClickAddTag}
              className={onSubmit ? '' : 'hidden'}
              label={<b>+</b>}
            />
            {tags.map((t, i) =>
              <Chip key={i} style={chipStyles.chip} onDelete={onSubmit ? () => onClickDeleteTag(i) : null} label={t}/>
            )}
          </div>
          {tagModal}
        </CardPanel>
        <CardPanel title="Monitors">
          <div className="margin-md-top flex-horizontal" style={{height: 250}}>
            <div className="flex-1" style={{overflow: 'auto'}}>
              <Monitors monitors={monitors} onEditMonitor={onSubmit ? onEditMonitor : null} onRemoveMonitor={onSubmit ? onRemoveMonitor : null} />
            </div>
            <div className="flex-1" style={{maxHeight: 250 , overflow: 'auto'}}>
              <MonitorTemplates monitors={monitors} monitorTemplates={monitorTemplates} onAddMonitor={onSubmit ? onAddMonitor : null} />
            </div>
          </div>
        </CardPanel>

        <CardPanel title="Workflows">
          <Workflows workflows={workflows} showWfSelectModal={onSubmit ? showWfSelectModal : null} onClickDeleteWf={onSubmit ? onClickDeleteWf : null}/>
        </CardPanel>
        {onSubmit && <SubmitBlock name="Save"/>}
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
