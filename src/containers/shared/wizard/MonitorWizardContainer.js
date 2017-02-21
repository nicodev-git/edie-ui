import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {MonitorWizard} from 'components/shared/wizard/DeviceWizard'

import { fetchMonitorTemplates } from 'actions'

@connect(
  state => ({
    initialValues: state.devices.monitorInitialValues
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchMonitorTemplates
    }, dispatch)
  })
)

export default class MonitorWizardContainer extends React.Component {
  render () {
    return (
      <MonitorWizard {...this.props} />
    )
  }
}
