import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import ShapeListModalView from './ShapeListModalView'

export default class ShapeListModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render () {
    const {onClose} = this.props
    return (
      <ShapeListModalView
        onClose={onClose}
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
