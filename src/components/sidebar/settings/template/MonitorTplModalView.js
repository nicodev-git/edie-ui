import React, { Component } from 'react'
import {Dialog, RaisedButton, Chip} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, ImageUploader, FormCheckbox } from 'components/modal/parts'

import { chipStyles } from 'style/common/materialStyles'

export default class MonitorTplModalView extends Component {
  render () {
    const {
      header, imgUrl, onSubmit, onHide, onChange,
      tagModal, tags, onClickAddTag, onClickDeleteTag
    } = this.props
    return (
      <Dialog open title={header}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="name" component={FormInput} label="Name"/>
            <Field name="description" component={FormInput} label="Description"/>
            <Field name="monitortype" component={FormInput} label="Monitor type"/>
            <Field name="enabled" component={FormCheckbox} label="Enabled" labelPosition="right"/>
            <ImageUploader imgUrl={imgUrl} onChange={onChange}/>

            <div>
              <RaisedButton label="Add Tag" onTouchTap={onClickAddTag}/>
            </div>
            <div style={chipStyles.wrapper}>
              {tags.map((t, i) =>
                <Chip key={i} style={chipStyles.chip} onRequestDelete={() => onClickDeleteTag(i)}>{t}</Chip>
              )}
            </div>
            {tagModal}
          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Dialog>
    )
  }
}
