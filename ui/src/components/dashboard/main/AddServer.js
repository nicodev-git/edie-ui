import React from 'react'
// import {findIndex} from 'lodash'
import {parse} from 'query-string'

import { getDeviceType } from 'components/common/wizard/WizardConfig'
import DeviceWizardContainer from 'containers/shared/wizard/DeviceWizardContainer'

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
  }

  // getTplId () {
  //   const params = parse(this.props.location.search)
  //   return params.tpl
  // }
  //
  // getTemplate () {
  //   const {deviceTemplates} = this.props
  //   const id = this.getTplId()
  //   const index = findIndex(deviceTemplates, {id})
  //   if (index < 0) return null
  //   return deviceTemplates[index]
  // }

  onChangeDistribution () {
    console.log(arguments)
  }


  closeCallback () {

  }

  addDevice () {

  }

  deleteMapDevice () {

  }

  onFinishAddWizard (res, params, url) {
    this.props.addDevice(params, url)

    const query = parse(this.props.location.search)
    if (query.from === 'servers') {
      this.props.history.push('/dashboard/servers')
    }
  }

  render () {
    const {tpl} = this.state
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
    )
  }
}
