import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {MonitorWizard} from 'components/shared/wizard/DeviceWizard'

import { fetchMonitorTemplates, openParamsModal } from 'actions'

@connect(
  state => ({
    initialValues: state.devices.monitorInitialValues,
    monitorParams: state.devices.monitorParams,

    paramsModalOpen: state.devices.paramsModalOpen,
    paramEditModalOpen: state.devices.paramEditModalOpen
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchMonitorTemplates,
      openParamsModal
    }, dispatch)
  })
)

export default class MonitorWizardContainer extends React.Component {
  render () {
    return (
      <MonitorWizard showMonitorParams {...this.props} />
    )
  }
}
