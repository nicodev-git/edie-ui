import React from 'react'

export default class TagsView extends React.Component {
  onClickAddTag () {
    this.props.showWorkflowTagModal(true)
  }
  onPickTag (tag) {
    this.props.addWorkflowTag(tag.name)
  }
  render () {
    return (
      <div></div>
    )
  }
}
