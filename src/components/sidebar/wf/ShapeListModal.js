import React, {Component} from 'react'
import {uniq, sort} from 'lodash'

import ShapeListModalView from './ShapeListModalView'

export default class ShapeListModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedGroup: ''
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

  render () {
    return (
      <ShapeListModalView
        {...this.props}
        shapes={this.getFilteredShapes.bind(this)}
        selectedGroup={this.state.selectedGroup}
        groups={this.getGroups()}
        onChangeGroup={this.onChangeGroup.bind(this)}
      />
    )
  }
}

// export default connect(
//   (state, props) => ({
//     initialValues: props.editShape
//   }), {})(reduxForm({
//   form: 'shapeModalEditForm'
// })(ShapeModal))
