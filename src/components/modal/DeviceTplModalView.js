import React, { Component } from 'react'
import { Field } from 'redux-form'
import {Chip, FlatButton, Dialog} from 'material-ui'

import { SubHeader, SubmitBlock, FormInput, FormSelect, ImageUploader,
  Monitors, MonitorTemplates, Workflows } from './parts'
import { chipStyles } from 'style/materialStyles'

export default class DeviceTplModalView extends Component {
  renderContent () {
    const {options, imgUrl, onSubmit, onHide, onChange,
      monitors, monitorTemplates, onAddMonitor, onEditMonitor, onRemoveMonitor,
      workflows, showWfSelectModal, onClickDeleteWf,
      tagModal, tags, onClickAddTag, onClickDeleteTag
    } = this.props
    return (
      <form onSubmit={onSubmit}>
        <div className="form-column padding-left-12 margin-bottom-0">
          <Field name="name" component={FormInput} label="Name"/>
          <Field name="devicetemplategroup" component={FormSelect} label="Group" options={options}/>
          <ImageUploader imgUrl={imgUrl} onChange={onChange}/>
        </div>

        <div>
          <FlatButton label="Add Tag" onTouchTap={onClickAddTag}/>
        </div>
        <div style={chipStyles.wrapper}>
          {tags.map((t, i) =>
            <Chip key={i} style={chipStyles.chip} onRequestDelete={() => onClickDeleteTag(i)}>{t}</Chip>
          )}
        </div>

        <div className="subheader-wrapper">
          <SubHeader name="Monitors"/>
        </div>
        <div>
          <div className="col-md-6 modal-left">
            <Monitors monitors={monitors} onEditMonitor={onEditMonitor} onRemoveMonitor={onRemoveMonitor} />
            <Workflows workflows={workflows} showWfSelectModal={showWfSelectModal} onClickDeleteWf={onClickDeleteWf}/>
          </div>
          <div className="col-md-6 modal-right" style={{maxHeight: '200px', overflow: 'auto'}}>
            <MonitorTemplates monitors={monitors} monitorTemplates={monitorTemplates} onAddMonitor={onAddMonitor} />
          </div>
        </div>
        {tagModal}
        <SubmitBlock name="Save" onClick={onHide}/>
      </form>
    )
  }
  render () {
    const {header, innerView} = this.props
    if (innerView) return this.renderContent()
    return (
      <Dialog open title={header}>
        {this.renderContent()}
      </Dialog>
    )
  }
}
