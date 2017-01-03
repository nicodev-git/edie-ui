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
  deleteMonitorTemplate
} from '../../../../../actions'

@connect(
  state => ({
    monitorTemplates: state.settings.monitorTemplates,
    deviceTemplates: state.settings.deviceTemplates,
    deviceTplModalVisible: state.settings.deviceTplModalVisible,
    monitorTplModalVisible: state.settings.monitorTplModalVisible,
    tplImageModalVisible: state.settings.tplImageModalVisible
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchDeviceTemplates,
      fetchMonitorTemplates,
      openDeviceTplModal,
      deleteDeviceTemplate,
      openMonitorTplModal,
      deleteMonitorTemplate
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
