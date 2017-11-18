import React from 'react'
import {findIndex} from 'lodash'
import {parse} from 'query-string'

import { getDeviceType, commonconfig } from 'components/common/wizard/WizardConfig'
import DeviceWizardContainer from 'containers/shared/wizard/DeviceWizardContainer'
import RefreshOverlay from 'components/common/RefreshOverlay'
import {showAlert} from "../../common/Alert";

export default class AddServer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tpl: null
    }
  }
  componentWillMount () {
    this.props.fetchDeviceTemplates()
    this.props.fetchMonitorTemplates()
  }

  componentDidUpdate(prevProps) {
    const {deviceTemplates} = this.props
    if (!this.state.tpl && deviceTemplates !== prevProps.deviceTemplates && deviceTemplates.length) {
      this.setState({
        tpl: deviceTemplates[0]
      })
    }

    if (prevProps.addingDevice && !this.props.addingDevice) {
      if (this.props.addDeviceError) {
        showAlert(this.props.addDeviceError)
      } else {
        const query = parse(this.props.location.search)
        if (query.from === 'servers') {
          this.props.history.push('/dashboard/servers')
        }
      }
    }
  }

  onChangeDistribution (value) {
    console.log(arguments)
    const {deviceTemplates} = this.props
    const distIndex = findIndex(commonconfig.distribution.values, {value})
    if (distIndex < 0) return
    const dist = commonconfig.distribution.values[distIndex]
    const index = findIndex(deviceTemplates, {name: dist.template})
    if (index < 0) return
    this.setState({
      tpl: deviceTemplates[index]
    })
    console.log(deviceTemplates[index])
  }


  closeCallback () {

  }

  addDevice () {

  }

  deleteMapDevice () {

  }

  onFinishAddWizard (res, params, url) {
    this.props.addDevice(params, url)
  }

  render () {
    const {tpl, addingDevice} = this.state
    if (!tpl) {
      return <div>Loading...</div>
    }
    let extra = {
      x: 0,
      y: 0,
      width: 50,
      height: 50,
      image: tpl.image,
      templateName: tpl.name,
      workflowids: tpl.workflowids || [],
      tags: tpl.tags || []
    }

    return (
      <div>
        <DeviceWizardContainer
          noModal
          deviceType={getDeviceType(tpl.name)}
          onClose={this.closeCallback.bind(this)}
          title={tpl.name}
          monitors={tpl.monitors || []}
          extraParams={extra}
          configParams={{}}
          onFinish={this.onFinishAddWizard.bind(this)}
          addDevice={this.addDevice.bind(this)}
          removeDevice={this.deleteMapDevice.bind(this)}
          onChangeDistribution={this.onChangeDistribution.bind(this)}
        />
        {addingDevice && <RefreshOverlay/>}
      </div>
    )
  }
}
