import React from 'react'
import {Button} from '@material-ui/core'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import ShapeEditModal from './ShapeEditModal'

export default class ShapeAdd extends React.Component {
  componentWillMount() {
    this.props.fetchOutputObjects()
    this.props.fetchDevices()
  }

  onClickShapes () {
    this.props.history.push('/workflow/shapes')
  }

  onSaveShape (entity) {
    this.props.addShape(entity)
    this.onClickShapes()
  }

  getGroup() {
    const {group} = this.props.match.params
    return group || 'General'
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
            showGroupSelect
            onSave={this.onSaveShape.bind(this)}

            group={this.getGroup()}

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