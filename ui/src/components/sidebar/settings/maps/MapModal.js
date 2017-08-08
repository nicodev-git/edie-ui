import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { assign } from 'lodash'
import { connect } from 'react-redux'

import MapModalView from './MapModalView'

class MapModal extends Component {
  componentWillMount () {
    this.props.fetchSettingUsers()
  }
  closeModal () {
    this.props.closeSettingMapModal()
  }

  handleFormSubmit (values) {
    const {editMap} = this.props
    let map = assign({}, editMap, values)
    if (editMap) {
      this.props.updateSettingMap(map)
    } else {
      this.props.addSettingMap(map)
    }
  }

  render () {
    const { handleSubmit, users, mapUsers } = this.props
    return (
      <MapModalView
        users={users}
        mapUsers={mapUsers}
        onHide={this.closeModal.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      />
    )
  }
}
export default connect(
  state => ({
    initialValues: state.settings.editMap
  })
)(reduxForm({form: 'mapEditForm'})(MapModal))
