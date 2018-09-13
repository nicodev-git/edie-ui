import React from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import MapItemModalView from './MapItemModalView'

class MapItemModal extends React.Component {
  handleFormSubmit (values) {
    this.props.onSave(values)
  }

  render() {
    const {handleSubmit, onClose, type, editMapItem} = this.props
    return (
      <MapItemModalView
        type={editMapItem.type}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClose={onClose}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editMapItem
  })
)(reduxForm({form: 'mapItemForm'})(MapItemModal))