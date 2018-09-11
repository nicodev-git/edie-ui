import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ShapeEdit from 'components/sidebar/wf/shape/ShapeEdit'

import {
  fetchDevices,

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
      <ShapeEdit {...this.props}/>
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
    fetchDevices,

    fetchShapes,
    addShape,
    updateShape,
    removeShape,
    testShapeScript,
    updateShapeScriptResult,

    fetchOutputObjects
  }
)(withRouter(ShapesContainer))
