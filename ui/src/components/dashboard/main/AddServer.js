import React from 'react'
import { wizardConfig, getDeviceType } from 'components/common/wizard/WizardConfig'
import DeviceWizardContainer from 'containers/shared/wizard/DeviceWizardContainer'

export default class AddServer extends React.Component {
  componentWillMount () {
    this.props.fetchDeviceTemplates()
    this.props.fetchMonitorTemplates()
  }


  closeCallback () {

  }
  addDevice () {

  }
  deleteMapDevice () {

  }

  onFinishAddWizard () {

  }

  render () {
    const {options} = this.state.deviceWizardConfig

    let extra = {
      x: 0,
      y: 0,
      width: 50,
      height: 50,
      image: options.imgName,
      templateName: options.templateName,
      workflowids: options.workflowids,
      tags: options.tpl.tags || []
    }

    return (
      <DeviceWizardContainer
        deviceType={options.type}
        onClose={this.closeCallback.bind(this)}
        title={options.title}
        monitors={options.monitors}
        extraParams={extra}
        configParams={{}}
        onFinish={this.onFinishAddWizard.bind(this)}
        addDevice={this.addDevice.bind(this)}
        removeDevice={this.deleteMapDevice.bind(this)}
      />
    )
  }
}
