import React from 'react'

import {Button} from '@material-ui/core'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import ShapeEditModal from './ShapeEditModal'

export default class ShapeEdit extends React.Component {
  componentWillMount() {
    this.props.fetchOutputObjects()
    this.props.fetchDevices()
  }

  getShapeId () {
    return this.props.match.params.id
  }

  onClickShapes () {
    this.props.history.push('/workflow/shapes')
  }

  onSaveShape (entity) {
    this.props.addShape(entity)
    this.onClickShapes()
  }

  render() {
    return (
      <TabPage>
        <TabPageHeader title="Add Shape">
          <div className="text-center margin-md-top">
            <div className="pull-left text-left">
            </div>
            <div className="pull-right">
              <Button variant="raised" onClick={this.onClickShapes.bind(this)}>Shapes</Button>
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