import React from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

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
      <TabPage>
        <TabPageHeader title="Add Shape">
          <div className="text-center margin-md-top">
            <div className="pull-left text-left">
            </div>
            <div className="pull-right">

            </div>
          </div>
        </TabPageHeader>

        <TabPageBody history={this.props.history} location={this.props.location} transparent>
          <ShapeEditModal
            noModal
            onSave={this.onSaveShape.bind(this)}

            applyDeviceIds={[]}
            testShapeScript={this.props.testShapeScript}

            updateShapeScriptResult={this.props.updateShapeScriptResult}
            shapeScriptResult={this.props.shapeScriptResult}
            shapeScriptStatus={this.props.shapeScriptStatus}

            devices={this.props.devices}
            playbookObjects={this.props.playbookObjects}
          />
        </TabPageBody>
      </TabPage>
    )
  }
}