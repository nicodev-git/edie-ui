import React from 'react'

import ShapeEditModal from './ShapeEditModal'

export default class ShapeAdd extends React.Component {
  componentWillMount() {
    this.props.fetchOutputObjects()
    this.props.fetchDevices()
  }

  onSaveShape () {

  }

  render() {
    return (
      <ShapeEditModal
        onSave={this.onSaveShape.bind(this)}

        applyDeviceIds={[]}
        testShapeScript={this.props.testShapeScript}

        updateShapeScriptResult={this.props.updateShapeScriptResult}
        shapeScriptResult={this.props.shapeScriptResult}
        shapeScriptStatus={this.props.shapeScriptStatus}

        devices={this.props.devices}
        playbookObjects={this.props.playbookObjects}
      />
    )
  }
}