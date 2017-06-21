import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {MonitorWizard} from 'components/shared/wizard/DeviceWizard'

import {
  fetchMonitorTemplates,
  openParamsModal,

  openParamEditModal,
  closeParamsModal,
  removeParam,
  updateMonitorParams,

  updateMonitorTags,
  showMonitorTagModal
} from 'actions'

@connect(
  state => ({
    initialValues: state.devices.monitorInitialValues,

    paramsModalOpen: state.devices.paramsModalOpen,
    paramEditModalOpen: state.devices.paramEditModalOpen,

    editParams: state.devices.editParams,
    monitorTagModalOpen: state.devices.monitorTagModalOpen,
    monitorTags: state.devices.monitorTags
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchMonitorTemplates,
      openParamsModal,

      openParamEditModal,
      closeParamsModal,
      removeParam,
      updateMonitorParams,

      updateMonitorTags,
      showMonitorTagModal
    }, dispatch)
  })
)

export default class MonitorWizardContainer extends React.Component {
  render () {
    return (
      <MonitorWizard {...this.props} canAddTags/>
    )
  }
}
