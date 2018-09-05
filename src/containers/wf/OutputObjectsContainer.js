import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import OutputObjects from 'components/sidebar/wf/outputObjects/OutputObjects'

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
    outputObjects: state.workflow.outputObjects
  }), {
    fetchOutputObjects,
    addOutputObject,
    updateOutputObject,
    removeOutputObject
  }
)(withRouter(OutputObjectsContainer))
