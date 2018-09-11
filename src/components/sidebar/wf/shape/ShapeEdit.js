import React from 'react'

import {Button} from '@material-ui/core'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import ShapeEditModal from './ShapeEditModal'

export default class ShapeEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editShape: null
    }
  }
  componentWillMount() {
    this.props.fetchOutputObjects()
    this.props.fetchDevices()
  }

  componentDidMount() {
    this.props.fetchShape(this.getShapeId(), editShape => {
      this.setState({
        editShape
      })
    })
  }

  getShapeId () {
    return this.props.match.params.id
  }

  onClickShapes () {
    this.props.history.push('/workflow/shapes')
  }

  onSaveShape (entity) {
    this.props.updateShape(entity)
    this.onClickShapes()
  }

  render() {
    const {editShape} = this.state
    return (
      <TabPage>
        <TabPageHeader title="Shape">
          <div className="text-center margin-md-top">
            <div className="pull-left text-left">
            </div>
            <div className="pull-right">
              <Button variant="raised" onClick={this.onClickShapes.bind(this)}>Shapes</Button>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody history={this.props.history} location={this.props.location} transparent>
          {editShape ? (
            <ShapeEditModal
              noModal
              onSave={this.onSaveShape.bind(this)}
              editShape={editShape}

              applyDeviceIds={[]}
              testShapeScript={this.props.testShapeScript}

              updateShapeScriptResult={this.props.updateShapeScriptResult}
              shapeScriptResult={this.props.shapeScriptResult}
              shapeScriptStatus={this.props.shapeScriptStatus}

              devices={this.props.devices}
              playbookObjects={this.props.playbookObjects}
            />
          ) : (
            <div>Loading...</div>
          )}

        </TabPageBody>
      </TabPage>
    )
  }
}