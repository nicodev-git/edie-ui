import React from 'react'
import TagPickerModalView from './TagPickerModalView'

import {showPrompt, showAlert} from 'components/shared/Alert'

export default class TagPickerModal extends React.Component {
  componentWillMount () {
    this.props.selectTag(null)
    this.props.fetchTags()
  }
  onSelectTag (tag) {
    this.props.selectTag(tag)
  }
  onClickOK () {
    const {selectedTag, onPick, onClickClose} = this.props
    if (!selectedTag) return showAlert('Please select tag.')
    onPick && onPick(selectedTag)
    onClickClose()
  }
  onClickAdd () {
    showPrompt('Please type tag name.', '', tag => {
      if (!tag) return
      this.props.addTag({
        name: tag,
        desc: ''
      })
    })
  }
  render () {
    return (
      <TagPickerModalView
        {...this.props}
        onClickAdd={this.onClickAdd.bind(this)}
        onSelectTag={this.onSelectTag.bind(this)}
        onClickOK={this.onClickOK.bind(this)}
      />
    )
  }
}
