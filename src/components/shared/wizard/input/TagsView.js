import React from 'react'
import {Chip, RaisedButton} from 'material-ui'
import TagPickerModal from 'containers/settings/tag/TagPickerModalContainer'

import { chipStyles } from 'style/materialStyles'

export default class TagsView extends React.Component {
  onClickAddTag () {
    this.props.showMonitorTagModal(true)
  }
  onPickTag (tag) {
    const {monitorTags} = this.props
    this.props.updateMonitorTags([...monitorTags, tag.name])
  }
  onClickDeleteTag (index) {
    const {monitorTags} = this.props
    this.props.updateMonitorTags(monitorTags.filter((p, i) => i !== index))
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
          <RaisedButton label="Add Tag" onTouchTap={this.onClickAddTag.bind(this)}/>
        </div>
        <div style={chipStyles.wrapper}>
          {monitorTags.map((t, i) =>
            <Chip key={i} style={chipStyles.chip} onRequestDelete={() => this.onClickDeleteTag(i)}>{t}</Chip>
          )}
        </div>
        {this.renderTagsModal()}
      </div>
    )
  }
}
