import React from 'react'
import Templates from 'components/page/content/settings/template/Templates'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {withRouter} from 'react-router'

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
  selectTplWfRow,
  addDeviceTplWf,
  removeDeviceTplWf,

  fetchWorkflows,

  addDeviceTemplate,
  updateDeviceTemplate,
  closeDeviceTplModal,
  openTplImageModal,
  shareMonitorTemplate,

  addMonitorTemplate,
  updateMonitorTemplate,
  closeMonitorTplModal,

  closeTplImageModal,
  fetchImages,
  uploadImage,

  fetchDeviceCategories,

  addDeviceTplTag,
  removeDeviceTplTag,
  showDeviceTplTagModal
} from 'actions'

@connect(
  state => ({
    deviceCategories: state.settings.deviceCategories,
    monitorTemplates: state.settings.monitorTemplates,
    deviceTemplates: state.settings.deviceTemplates,
    deviceTplModalVisible: state.settings.deviceTplModalVisible,
    monitorTplModalVisible: state.settings.monitorTplModalVisible,
    tplImageModalVisible: state.settings.tplImageModalVisible,

    deviceTplTagModalOpen: state.settings.deviceTplTagModalOpen,
    editDeviceTplTags: state.settings.editDeviceTplTags,

    shareMonitorTplResult: state.settings.shareMonitorTplResult,

    deviceTpl: state.settings.deviceTpl,
    selectedDeviceTpl: state.settings.selectedDeviceTpl,
    selectedDeviceMonitors: state.settings.selectedDeviceMonitors,
    selectedTplImage: state.settings.selectedTplImage,
    editTplWorkflows: state.settings.editTplWorkflows,
    wfSelectModalOpen: state.settings.wfSelectModalOpen,
    selectedRowWf: state.settings.selectedRowWf,
    workflows: state.settings.workflows,

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
      selectTplWfRow,
      addDeviceTplWf,
      removeDeviceTplWf,

      fetchWorkflows,

      addDeviceTemplate,
      updateDeviceTemplate,
      closeDeviceTplModal,
      openTplImageModal,
      shareMonitorTemplate,

      addMonitorTemplate,
      updateMonitorTemplate,
      closeMonitorTplModal,

      closeTplImageModal,
      fetchImages,
      uploadImage,
      fetchDeviceCategories,

      addDeviceTplTag,
      removeDeviceTplTag,
      showDeviceTplTagModal
    }, dispatch)
  })
)
@withRouter
export default class TemplatesContainer extends React.Component {
  render () {
    return (
      <Templates {...this.props} />
    )
  }
}
