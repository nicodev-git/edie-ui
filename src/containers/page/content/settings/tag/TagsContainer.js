import React from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'

import Tags from 'components/page/content/settings/tag/Tags'

import {
  showTagModal,
  addTag,
  updateTag,
  removeTag
} from 'actions'

@connect(
  state => ({
    tagDraw: state.tag.tagDraw,
    tagModalOpen: state.tag.tagModalOpen,
    editTag: state.tag.editTag
  }), {
    showTagModal,
    addTag,
    updateTag,
    removeTag
  }
)
@withRouter
export default class TagsContainer extends React.Component {
  render () {
    return (
      <Tags {...this.props}/>
    )
  }
}
