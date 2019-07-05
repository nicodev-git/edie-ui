import React from 'react'

import { Modal } from 'components/modal/parts'
import MonitorTable from 'components/common/wizard/input/MonitorTable'

export default class DeviceMonitorsModalView extends React.Component {
  renderMonitors () {
    const {monitors, monitorTemplates, onChangedMonitors, openDeviceMonitorWizard,
      deviceTemplates, collectors, addBasicMonitors, editDevice, removeBasicMonitors} = this.props
    return (
      <MonitorTable
        monitors={monitors}
        templates={monitorTemplates}
        onChanged={onChangedMonitors}
        openDeviceMonitorWizard={openDeviceMonitorWizard}
        deviceTemplates={deviceTemplates}
        collectors={collectors}
        hideDevices
        device={editDevice}
        addBasicMonitors={addBasicMonitors}
        removeBasicMonitors={removeBasicMonitors}
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
