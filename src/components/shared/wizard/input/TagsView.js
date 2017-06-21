import React from 'react'
import {Chip, RaisedButton} from 'material-ui'

import { chipStyles } from 'style/materialStyles'

export default class TagsView extends React.Component {
  onClickAddTag () {
    this.props.showMonitorTagModal(true)
  }
  onPickTag (tag) {
    this.props.addWorkflowTag(tag.name)
  }
  onClickDeleteTag () {

  }
  renderTagsModal () {
    if (!this.props.monitorTagModalOpen) return null
    return (
      <TagPickerModal
        onPick={this.onPickTag.bind(this)}
        onClickClose={() => this.props.showMonitorTagModal(false)}/>
    )
  }
  render () {
    const {monitorTags} = this.props
    return (
      <div>
        <div>
          <RaisedButton label="Add Tag" onTouchTap={onClickAddTag}/>
        </div>
        <div style={chipStyles.wrapper}>
          {tags.map((t, i) =>
            <Chip key={i} style={chipStyles.chip} onRequestDelete={() => onClickDeleteTag(i)}>{t}</Chip>
          )}
        </div>
        {this.renderTagsModal()}
      </div>
    )
  }
}
