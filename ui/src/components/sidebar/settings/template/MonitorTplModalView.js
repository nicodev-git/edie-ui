import React, { Component } from 'react'
import {Dialog, RaisedButton, Chip} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, ImageUploader, FormCheckbox } from 'components/modal/parts'

import { chipStyles } from 'style/common/materialStyles'

export default class MonitorTplModalView extends Component {
  render () {
    const {
      header, imgUrl, onSubmit, onHide, onChange,
      tagModal, tags, onClickAddTag, onClickDeleteTag,
      credTypeModal, monitorTplCredTypes, onClickAddCredType, onClickDeleteCredType
    } = this.props
    return (
      <Dialog open title={header} onRequestClose={onHide}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="name" component={FormInput} label="Name"/>
            <Field name="description" component={FormInput} label="Description"/>
            <Field name="monitortype" component={FormInput} label="Monitor type"/>
            <Field name="enabled" component={FormCheckbox} label="Enabled" labelPosition="right"/>

            <div className="padding-sm-top padding-sm-bottom">
              <ImageUploader imgUrl={imgUrl} onChange={onChange}/>
            </div>

            <div>
              <RaisedButton label="Add Tag" onTouchTap={onClickAddTag}/>
            </div>
            <div style={chipStyles.wrapper}>
              {tags.map((t, i) =>
                <Chip key={i} style={chipStyles.chip} onRequestDelete={() => onClickDeleteTag(i)}>{t}</Chip>
              )}
            </div>

            <div className="padding-md-top">
              <RaisedButton label="Add Credential Type" onTouchTap={onClickAddCredType}/>
            </div>
            <div style={chipStyles.wrapper}>
              {monitorTplCredTypes.map((t, i) =>
                <Chip key={i} style={chipStyles.chip} onRequestDelete={() => onClickDeleteCredType(i)}>{t}</Chip>
              )}
            </div>

            {tagModal}
            {credTypeModal}
          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Dialog>
    )
  }
}
