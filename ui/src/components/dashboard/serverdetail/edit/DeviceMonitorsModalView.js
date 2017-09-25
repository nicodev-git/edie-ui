import React from 'react'

import { Modal } from 'components/modal/parts'
import MonitorTable from 'components/common/wizard/input/MonitorTable'

export default class DeviceMonitorsModalView extends React.Component {
  renderMonitors () {
    const {monitors, monitorTemplates, onChangedMonitors, openDeviceMonitorWizard,
      deviceTemplates, collectors} = this.props
    return (
      <MonitorTable
        monitors={monitors}
        templates={monitorTemplates}
        onChanged={onChangedMonitors}
        openDeviceMonitorWizard={openDeviceMonitorWizard}
        deviceTemplates={deviceTemplates}
        collectors={collectors}
        hideDevices
      />
    )
  }

  render () {
    const {onHide} = this.props
    return (
      <Modal title="Monitors" onRequestClose={onHide}>
        {this.renderMonitors()}
      </Modal>
    )
  }
}
