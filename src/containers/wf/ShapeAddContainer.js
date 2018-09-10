import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ShapeAdd from 'components/sidebar/wf/shape/ShapeAdd'

import {
  fetchShapes,
  addShape,
  updateShape,
  removeShape,
  testShapeScript,
  updateShapeScriptResult,

  fetchOutputObjects
} from 'actions'

class ShapesContainer extends React.Component {
  render () {
    return (
      <ShapeAdd {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    devices: state.devices.devices,

    shapes: state.workflow.shapes,
    shapeScriptResult: state.workflow.shapeScriptResult,
    shapeScriptStatus: state.workflow.shapeScriptStatus,
    playbookObjects: state.workflow.playbookObjects
  }), {
    fetchShapes,
    addShape,
    updateShape,
    removeShape,
    testShapeScript,
    updateShapeScriptResult,

    fetchOutputObjects
  }
)(withRouter(ShapesContainer))
