import React from 'react'
import Templates from '../../../../../components/page/content/settings/template/Templates'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  fetchDeviceTemplates,
  deleteDeviceTemplate,
  openDeviceTplModal,
  fetchMonitorTemplates,
  openMonitorTplModal,
  deleteMonitorTemplate,

  addDeviceTemplate,
  updateDeviceTemplate,
  closeDeviceTplModal,
  openTplImageModal,

  addMonitorTemplate,
  updateMonitorTemplate,
  closeMonitorTplModal,

  closeTplImageModal,
  fetchImages,
  uploadImage
} from '../../../../../actions'

@connect(
  state => ({
    monitorTemplates: state.settings.monitorTemplates,
    deviceTemplates: state.settings.deviceTemplates,
    deviceTplModalVisible: state.settings.deviceTplModalVisible,
    monitorTplModalVisible: state.settings.monitorTplModalVisible,
    tplImageModalVisible: state.settings.tplImageModalVisible,

    deviceTpl: state.settings.deviceTpl,
    selectedTplImage: state.settings.selectedTplImage,

    monitorTpl: state.settings.monitorTpl,

    customImages: state.dashboard.images
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchDeviceTemplates,
      fetchMonitorTemplates,
      openDeviceTplModal,
      deleteDeviceTemplate,
      openMonitorTplModal,
      deleteMonitorTemplate,

      addDeviceTemplate,
      updateDeviceTemplate,
      closeDeviceTplModal,
      openTplImageModal,

      addMonitorTemplate,
      updateMonitorTemplate,
      closeMonitorTplModal,

      closeTplImageModal,
      fetchImages,
      uploadImage
    }, dispatch)
  })
)
export default class TemplatesContainer extends React.Component {
  render () {
    return (
      <Templates {...this.props} />
    )
  }
}
