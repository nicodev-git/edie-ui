import React, {Component} from 'react'
import {uniq, sort} from 'lodash'

import ShapeListModalView from './ShapeListModalView'
import ShapeEditModal from "./ShapeEditModal";

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
    return shapes.filter(p => p.group === selectedGroup)
  }

  onChangeGroup (e) {
    this.setState({
      selectedGroup: e.target.value
    })
  }

  onClickItem () {

  }

  onClickEditItem (editShape) {
    console.log(editShape)
    if (editShape.type === 'PRODUCTACTION') return
    this.setState({
      editModalOpen: true,
      editShape
    })
  }

  ////////////////////////////////////////////////////////////////////////////////

  onSaveShape (entity) {
    if (entity.id) {
      this.props.updateShape(entity)
    }
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
        editShape={this.state.editShape}
        onSave={this.onSaveShape.bind(this)}
        onClose={this.onCloseShape.bind(this)}
      />
    )
  }

  render () {
    return (
      <ShapeListModalView
        {...this.props}
        shapes={this.getFilteredShapes()}
        selectedGroup={this.state.selectedGroup}
        groups={this.getGroups()}
        onChangeGroup={this.onChangeGroup.bind(this)}
        onClickItem={this.onClickItem.bind(this)}
        onClickEditItem={this.onClickEditItem.bind(this)}
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
