import React from 'react'
import { connect } from 'react-redux'

import TagPickerModal from 'components/sidebar/settings/tag/TagPickerModal'

import {
  fetchTags,
  addTag,
  selectTag
} from 'actions'

@connect(
  state => ({
    tags: state.tag.tags,
    selectedTags: state.tag.selectedTags
  }), {
    fetchTags,
    addTag,
    selectTag
  }
)

export default class TagPickerModalContainer extends React.Component {
  render () {
    return (
      <TagPickerModal {...this.props}/>
    )
  }
}
