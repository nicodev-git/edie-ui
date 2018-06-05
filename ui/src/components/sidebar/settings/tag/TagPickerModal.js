import React from 'react'
import TagPickerModalView from './TagPickerModalView'

import {showPrompt, showAlert} from 'components/common/Alert'

export default class TagPickerModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }
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
  onChangeValue (e) {
    const {tags} = this.props
    const tag = e.target.value
    if (tags.includes(tag)) return
    this.onSelectTag(tag)
  }
  getTags () {
    const {tags, workflows} = this.props
    const allTags = tags.map(p => p.name)
    workflows.forEach(wf => {
      (wf.tags || []).forEach(t => {
        if (!allTags.includes(t)) {
          allTags.push(t)
        }
      })
    })
    return allTags
  }
  render () {
    return (
      <TagPickerModalView
        {...this.props}
        tags={this.getTags()}
        value=""
        onChangeValue={this.onChangeValue.bind(this)}
        onClickAdd={this.onClickAdd.bind(this)}
        onClickOK={this.onClickOK.bind(this)}
      />
    )
  }
}
