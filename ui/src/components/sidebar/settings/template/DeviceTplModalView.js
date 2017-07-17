import React, { Component } from 'react'
import { Field } from 'redux-form'
import {Chip, FlatButton, Dialog} from 'material-ui'

import { SubHeader, SubmitBlock, FormInput, ImageUploader,
  Monitors, MonitorTemplates, Workflows } from 'components/modal/parts'
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
        <div className="form-column padding-md-left mb-none">
          <Field name="name" component={FormInput} label="Name"/>
          <Field name="devicetemplategroup" component={FormInput} label="Group"/>
          <ImageUploader imgUrl={imgUrl} onChange={onChange}/>
        </div>

        <div className={onSubmit ? '' : 'hidden'}>
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
          <div className="col-md-6 ml-none">
            <Monitors monitors={monitors} onEditMonitor={onSubmit ? onEditMonitor : null} onRemoveMonitor={onSubmit ? onRemoveMonitor : null} />
            <Workflows workflows={workflows} showWfSelectModal={onSubmit ? showWfSelectModal : null} onClickDeleteWf={onSubmit ? onClickDeleteWf : null}/>
          </div>
          <div className="col-md-6 mr-none" style={{maxHeight: '200px', overflow: 'auto'}}>
            <MonitorTemplates monitors={monitors} monitorTemplates={monitorTemplates} onAddMonitor={onSubmit ? onAddMonitor : null} />
          </div>
        </div>
        {tagModal}
        {onSubmit && <SubmitBlock name="Save" onClick={onHide}/>}
      </form>
    )
  }
  render () {
    const {header, innerView} = this.props
    if (innerView) return this.renderContent()
    return (
      <Dialog open title={header} onRequestClose={this.props.onHide}>
        {this.renderContent()}
      </Dialog>
    )
  }
}
