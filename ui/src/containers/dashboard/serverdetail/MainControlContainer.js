import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import MainControl from 'components/dashboard/serverdetail/MainControl'
import {
  fetchGauges,

  showDeviceEditModal,
  updateMapDevice,

  showDeviceCredsModal
} from 'actions'

class MainControlContainer extends React.Component {
  render () {
    return (
      <MainControl {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    devices: state.devices.devices,
    deviceEditModalOpen: state.devices.deviceEditModalOpen,
    editDevice: state.devices.editDevice,
    deviceCredsModalOpen: state.devices.deviceCredsModalOpen,

    gauges: state.gauge.gauges,
    gaugeModalOpen: state.gauge.gaugeModalOpen,
    editGauge: state.gauge.editGauge,
    gaugePickerOpen: state.gauge.gaugePickerOpen,
  }), {
    fetchGauges,

    showDeviceEditModal,
    updateMapDevice,

    showDeviceCredsModal
  }
)(withRouter(MainControlContainer))
