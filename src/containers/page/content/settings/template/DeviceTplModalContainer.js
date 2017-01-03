import React, { Component } from 'react'
import DeviceTplModal from '../../../../../components/page/content/settings/template/DeviceTplModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  addDeviceTemplate,
  updateDeviceTemplate,
  closeDeviceTplModal,
  openTplImageModal
} from '../../../../../actions'

@connect(
  state => ({
    monitorTemplates: state.settings.monitorTemplates,
    deviceTpl: state.settings.deviceTpl,
    selectedTplImage: state.settings.selectedTplImage,
    initialValues: state.settings.deviceTpl || {}
  }),
  dispatch => ({
    ...bindActionCreators({
      addDeviceTemplate,
      updateDeviceTemplate,
      closeDeviceTplModal,
      openTplImageModal
    }, dispatch)
  })
)
export default class DeviceTplModalContainer extends Component {
  render () {
    return (
      <DeviceTplModal {...this.props} />
    )
  }
}
