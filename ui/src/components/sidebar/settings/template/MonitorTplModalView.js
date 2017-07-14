import React, { Component } from 'react'
import {Dialog, RaisedButton, Chip} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, ImageUploader, FormCheckbox } from 'components/modal/parts'

import { chipStyles } from 'style/common/materialStyles'

const contentStyle = {
  width: 570
}
export default class MonitorTplModalView extends Component {
  render () {
    const {
      header, imgUrl, onSubmit, onHide, onChange,
      tagModal, tags, onClickAddTag, onClickDeleteTag,
      credTypeModal, monitorTplCredTypes, onClickAddCredType, onClickDeleteCredType
    } = this.props
    return (
      <Dialog open title={header} onRequestClose={onHide} contentStyle={contentStyle}>
        <form onSubmit={onSubmit}>
          <Field name="name" component={FormInput} label="Name"/>&nbsp;
          <Field name="description" component={FormInput} label="Description"/>&nbsp;
          <Field name="monitortype" component={FormInput} label="Monitor type"/>&nbsp;

          <div className="pull-right">
            <ImageUploader imgUrl={imgUrl} onChange={onChange}/>
          </div>

          <Field name="enabled" component={FormCheckbox} label="Enabled" labelPosition="right"/>
          <div style={chipStyles.wrapper}>
            {tags.map((t, i) =>
              <Chip key={i} style={chipStyles.chip} onRequestDelete={() => onClickDeleteTag(i)}>{t}</Chip>
            )}
            <Chip style={chipStyles.chip} onTouchTap={onClickAddTag}>Add Tag</Chip>
          </div>
          <div style={chipStyles.wrapper}>
            {monitorTplCredTypes.map((t, i) =>
              <Chip key={i} style={chipStyles.chip} onRequestDelete={() => onClickDeleteCredType(i)}>{t}</Chip>
            )}
            <Chip style={chipStyles.chip} onTouchTap={onClickAddCredType}>Add Credential Type</Chip>
          </div>

          {tagModal}
          {credTypeModal}
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Dialog>
    )
  }
}
