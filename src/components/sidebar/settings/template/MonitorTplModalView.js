import React, { Component } from 'react'
import {Chip} from '@material-ui/core'
import { Field } from 'redux-form'
import { keys } from 'lodash'
import AddCircle from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'

import { SubmitBlock, FormInput, ImageUploader, FormCheckbox, Modal, CardPanel } from 'components/modal/parts'

import { chipStyles } from 'style/common/materialStyles'

const contentStyle = {
  width: 620
}

export default class MonitorTplModalView extends Component {
  renderBasicMonitorParams (type) {
    const {basicMonitor, onClickDeleteBasicParam} = this.props
    const items = keys(basicMonitor[type] || {}).map(name =>
      <Chip key={name} label={`${name} = ${basicMonitor[type][name]}`}
            onDelete={() => onClickDeleteBasicParam(type, name)}/>
    )
    return items
  }

  renderBasicMonitor () {
    const {
      allValues, onClickAddBasic,
      onClickAddBasicParam, onClickRemoveBasic,
      basicMonitor} = this.props
    const {monitortype} = allValues || {}
    if (monitortype !== 'basic') return
    return (
      <CardPanel title="Basic Monitor" tools={<AddCircle onClick={onClickAddBasic} className="link"/>}>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Monitor Type</th>
            <th>Config</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {keys(basicMonitor).map(type =>
            <tr key={type}>
              <td>{type}</td>
              <td>
                {this.renderBasicMonitorParams(type)}
                <Chip onClick={() => onClickAddBasicParam(type)} label={<b>+</b>}/>
              </td>
              <td>
                <DeleteIcon className="link" onClick={() => onClickRemoveBasic(type)}/>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </CardPanel>
    )
  }

  render () {
    const {
      header, imgUrl, onSubmit, onHide, onChange,
      tagModal, tags, onClickAddTag, onClickDeleteTag,
      credTypeModal, monitorTplCredTypes, onClickAddCredType, onClickDeleteCredType
    } = this.props
    return (
      <Modal title={header} onRequestClose={onHide} contentStyle={contentStyle}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Detail">
            <Field name="name" component={FormInput} label="Name"/>&nbsp;
            <Field name="description" component={FormInput} label="Description"/>&nbsp;
            <Field name="monitortype" component={FormInput} label="Monitor type"/>&nbsp;

            <div className="pull-right">
              <ImageUploader imgUrl={imgUrl} onChange={onChange}/>
            </div>

            <Field name="enabled" component={FormCheckbox} label="Enabled" />
            <Field name="basic" component={FormCheckbox} label="Basic Monitor" />
          </CardPanel>

          <CardPanel title="Tag" className="margin-md-top">
            <div style={chipStyles.wrapper}>
              {tags.map((t, i) =>
                <Chip key={i} style={chipStyles.chip} onDelete={() => onClickDeleteTag(i)} label={t}></Chip>
              )}
              <Chip style={chipStyles.chip} onClick={onClickAddTag} label={<b>+</b>}/>
            </div>
          </CardPanel>

          <CardPanel title="Credential Type" className="margin-md-top">
            <div style={chipStyles.wrapper}>
              {monitorTplCredTypes.map((t, i) =>
                <Chip key={i} style={chipStyles.chip} onDelete={() => onClickDeleteCredType(i)} label={t}/>
              )}
              <Chip style={chipStyles.chip} onClick={onClickAddCredType} label={<b>+</b>}/>
            </div>
          </CardPanel>

          {this.renderBasicMonitor()}

          <br/>
          {tagModal}
          {credTypeModal}
          <SubmitBlock name="Save"/>
        </form>
      </Modal>
    )
  }
}
