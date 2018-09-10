import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import OutputObjects from 'components/sidebar/wf/playbookObjects/OutputObjects'

import {
  fetchOutputObjects,
  addOutputObject,
  updateOutputObject,
  removeOutputObject
} from 'actions'

class OutputObjectsContainer extends React.Component {
  render () {
    return (
      <OutputObjects {...this.props}/>
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
)(withRouter(OutputObjectsContainer))
