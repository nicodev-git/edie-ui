import React from 'react'
import DeviceProductsTable from 'components/dashboard/serverdetail/DeviceProductsTable'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  updateSearchParams,
  replaceSearchWfs,
  updateQueryChips,
  updateMonitorRealTime,
  clearMonitors,

  showDeviceEditModal,
  updateMapDevice,

  fetchVendorProducts
} from 'actions'

class DeviceProductsContainer extends React.Component {
  render () {
    return (
      <DeviceProductsTable {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    device: state.dashboard.selectedDevice,
    devices: state.devices.devices,
    deviceEditModalOpen: state.devices.deviceEditModalOpen,
    editDevice: state.devices.editDevice,

    vendorProducts: state.settings.vendorProducts,
    productTypes: state.settings.productTypes,
    productVendors: state.settings.productVendors,

    params: state.search.params,
    monitorsUpdateTime: state.devices.monitorsUpdateTime
  }),
  {
    updateSearchParams,
    replaceSearchWfs,
    updateQueryChips,
    updateMonitorRealTime,
    clearMonitors,

    showDeviceEditModal,
    updateMapDevice,

    fetchVendorProducts
  }
)(withRouter(DeviceProductsContainer))
