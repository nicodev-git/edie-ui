import React from 'react'

import TagPickerModalView from './TagPickerModalView'

import {showPrompt, showAlert} from 'components/common/Alert'

export default class TagPickerModal extends React.Component {
  componentWillMount () {
    this.props.selectTag([])
    this.props.fetchTags()
  }
  onSelectTag (tag) {
    const {selectedTags, selectTag} = this.props
    if (!selectedTags.includes(tag)) selectTag([...selectedTags, tag])
  }
  onDeselectTag (tag) {
    const {selectedTags, selectTag} = this.props
    selectTag(selectedTags.filter(p => p !== tag.id))
  }
  onClickOK () {
    const {selectedTags, onPick, onPickMulti, onClickClose} = this.props
    if (!selectedTags.length) return showAlert('Please select tag.')
    if (onPickMulti) {
      onPickMulti(selectedTags.map(p => ({name: p})))
    } else if (onPick) {
      selectedTags.map(p => ({name: p})).forEach(onPick)
    }

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
        onDeselectTag={this.onDeselectTag.bind(this)}
        onClickOK={this.onClickOK.bind(this)}
      />
    )
  }
}
