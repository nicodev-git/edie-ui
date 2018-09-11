import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import PlaybookObjects from 'components/sidebar/wf/playbookObjects/PlaybookObjects'

import {
  fetchOutputObjects,
  addOutputObject,
  updateOutputObject,
  removeOutputObject
} from 'actions'

class PlaybookObjectsContainer extends React.Component {
  render () {
    return (
      <PlaybookObjects {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    playbookObjects: state.workflow.playbookObjects
  }), {
    fetchOutputObjects,
    addOutputObject,
    updateOutputObject,
    removeOutputObject
  }
)(withRouter(PlaybookObjectsContainer))
