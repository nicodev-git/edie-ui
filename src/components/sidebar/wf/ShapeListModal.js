import React, {Component} from 'react'
import {uniq} from 'lodash'

import ShapeListModalView from './ShapeListModalView'
import ShapeEditModal from './ShapeEditModal'

export default class ShapeListModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedGroup: '',

      editModalOpen: false,
      editShape: null
    }
  }

  getGroups() {
    const {shapes} = this.props
    const list = uniq(shapes.filter(p => !!p.group).map(p => p.group))
    return [{
      label: 'General', value: ''
    }, ...list.map(p => ({
      label: p,
      value: p
    }))]
  }

  getFilteredShapes () {
    const {shapes} = this.props
    const {selectedGroup} = this.state
    return shapes.filter(p => (p.group || '') === selectedGroup)
  }

  onChangeGroup (e) {
    this.setState({
      selectedGroup: e.target.value
    })
  }

  onClickItem (shape) {
    this.props.onClickShape(shape)
    this.props.onClose()
  }

  onClickAdd () {
    this.setState({
      editModalOpen: true,
      editShape: null
    })
  }

  onClickEditItem (editShape) {
    console.log(editShape)
    if (editShape.type === 'PRODUCTACTION') return
    this.setState({
      editModalOpen: true,
      editShape
    })
  }

  onClickDeleteItem (editShape) {
    if (editShape.type === 'PRODUCTACTION') return
    if (!window.confirm('Click OK to remove')) return
    this.props.removeShape(editShape)
  }

  ////////////////////////////////////////////////////////////////////////////////

  onSaveShape (entity) {
    if (entity.id) {
      this.props.updateShape(entity)
    } else {
      this.props.addShape(entity)
    }

    this.onCloseShape()
  }

  onCloseShape () {
    this.setState({
      editModalOpen: false
    })
  }

  ////////////////////////////////////////////////////////////////////////////////

  renderEditModal () {
    if (!this.state.editModalOpen) return false
    return (
      <ShapeEditModal
        group={this.state.selectedGroup}
        editShape={this.state.editShape}
        onSave={this.onSaveShape.bind(this)}
        onClose={this.onCloseShape.bind(this)}

        applyDeviceIds={this.props.applyDeviceIds}
        testShapeScript={this.props.testShapeScript}

        updateShapeScriptResult={this.props.updateShapeScriptResult}
        shapeScriptResult={this.props.shapeScriptResult}
        shapeScriptStatus={this.props.shapeScriptStatus}

        devices={this.props.devices}
        outputObjects={this.props.outputObjects}
      />
    )
  }

  render () {
    return (
      <ShapeListModalView
        {...this.props}
        shapes={this.getFilteredShapes()}
        onClickAdd={this.onClickAdd.bind(this)}

        selectedGroup={this.state.selectedGroup}
        groups={this.getGroups()}
        onChangeGroup={this.onChangeGroup.bind(this)}
        onClickItem={this.onClickItem.bind(this)}
        onClickEditItem={this.onClickEditItem.bind(this)}
        onClickDeleteItem={this.onClickDeleteItem.bind(this)}
      >
        {this.renderEditModal()}
      </ShapeListModalView>
    )
  }
}

// export default connect(
//   (state, props) => ({
//     initialValues: props.editShape
//   }), {})(reduxForm({
//   form: 'shapeModalEditForm'
// })(ShapeModal))
