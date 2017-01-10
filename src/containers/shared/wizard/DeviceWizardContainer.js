import React from 'react'
import DeviceWizard from '../../../components/shared/wizard/DeviceWizard'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchMonitorTemplates, clearDeviceWizardInitialValues } from '../../../actions'

@connect(
  state => ({
    monitorTemplates: state.settings.monitorTemplates,
    initialValues: state.devices.wizardInitialValues
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchMonitorTemplates,
      clearDeviceWizardInitialValues
    }, dispatch)
  })
)
export default class DeviceWizardContainer extends React.Component {
  render () {
    return (
      <DeviceWizard {...this.props} />
    )
  }
}

DeviceWizard.defaultProps = {
  title: '',
  deviceType: '',
  extraParams: {},
  configParams: {},
  hideNames: [],
  monitors: [],
  values: {},
  onStep0: null,
  onFinish: null
}
