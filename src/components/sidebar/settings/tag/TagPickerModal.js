import React from 'react'
import {findIndex} from 'lodash'

import TagPickerModalView from './TagPickerModalView'

import {showPrompt, showAlert} from 'components/shared/Alert'

export default class TagPickerModal extends React.Component {
  componentWillMount () {
    this.props.selectTag(null)
    this.props.fetchTags()
  }
  onSelectTag (tag) {
    const {selectedTags, selectTag} = this.props
    if (findIndex(selectedTags, {id: tag.id}) < 0) selectTag([...selectedTags, tag])
  }
  onDeselectTag (tag) {
    const {selectedTags, selectTag} = this.props
    selectTag(selectedTags.filter(p => p.id !== tag.id))
  }
  onClickOK () {
    const {selectedTags, onPick, onPickMulti, onClickClose} = this.props
    if (!selectedTags.length) return showAlert('Please select tag.')
    if (onPickMulti) {
      onPickMulti(selectedTags)
    } else if (onPick) {
      selectedTags.forEach(onPick)
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
