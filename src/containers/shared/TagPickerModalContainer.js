import React from 'react'
import { connect } from 'react-redux'

import TagPickerModal from 'components/shared/TagPickerModal'

import {
  fetchTags,
  addTag
} from 'actions'

@connect(
  state => ({
    tags: state.tag.tags
  }), {
    fetchTags,
    addTag
  }
)

export default class TagPickerModalContainer extends React.Component {
  render () {
    return (
      <TagPickerModal {...this.props}/>
    )
  }
}
