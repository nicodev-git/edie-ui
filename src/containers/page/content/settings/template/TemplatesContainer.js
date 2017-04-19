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
  selectDeviceTemplate,
  updateSelectedDeviceTplMonitors,
  fetchDeviceTplWorkflows,
  showWfSelectModal,

  addDeviceTemplate,
  updateDeviceTemplate,
  closeDeviceTplModal,
  openTplImageModal,

  addMonitorTemplate,
  updateMonitorTemplate,
  closeMonitorTplModal,

  closeTplImageModal,
  fetchImages,
  uploadImage,

  fetchDeviceCategories
} from '../../../../../actions'

@connect(
  state => ({
    deviceCategories: state.settings.deviceCategories,
    monitorTemplates: state.settings.monitorTemplates,
    deviceTemplates: state.settings.deviceTemplates,
    deviceTplModalVisible: state.settings.deviceTplModalVisible,
    monitorTplModalVisible: state.settings.monitorTplModalVisible,
    tplImageModalVisible: state.settings.tplImageModalVisible,

    deviceTpl: state.settings.deviceTpl,
    selectedDeviceTpl: state.settings.selectedDeviceTpl,
    selectedDeviceMonitors: state.settings.selectedDeviceMonitors,
    selectedTplImage: state.settings.selectedTplImage,
    editTplWorkflows: state.settings.editTplWorkflows,

    monitorTpl: state.settings.monitorTpl,

    images: state.dashboard.images
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchDeviceTemplates,
      fetchMonitorTemplates,
      openDeviceTplModal,
      deleteDeviceTemplate,
      openMonitorTplModal,
      deleteMonitorTemplate,
      selectDeviceTemplate,
      updateSelectedDeviceTplMonitors,
      fetchDeviceTplWorkflows,
      showWfSelectModal,

      addDeviceTemplate,
      updateDeviceTemplate,
      closeDeviceTplModal,
      openTplImageModal,

      addMonitorTemplate,
      updateMonitorTemplate,
      closeMonitorTplModal,

      closeTplImageModal,
      fetchImages,
      uploadImage,
      fetchDeviceCategories
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
