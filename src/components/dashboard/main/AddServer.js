import React from 'react'
import {findIndex} from 'lodash'
import {parse} from 'query-string'
import { SubmissionError } from 'redux-form'

import { getDeviceType, commonconfig } from 'components/common/wizard/WizardConfig'
import DeviceWizardContainer from 'containers/shared/wizard/DeviceWizardContainer'
import RefreshOverlay from 'components/common/RefreshOverlay'
import {showAlert} from 'components/common/Alert'

const nonScrollStyle = {
  overflow: 'hidden'
}

export default class AddServer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tpl: null
    }
  }
  componentWillMount () {
    // const {userInfo} = this.props
    // if (!(userInfo && userInfo.permissions && userInfo.permissions.includes('AddServer'))) {
    //   this.props.history.push('/')
    //   return
    // }
    this.props.fetchDeviceTemplates()
    this.props.fetchMonitorTemplates()
  }

  componentDidUpdate(prevProps) {
    const {deviceTemplates} = this.props
    if (!this.state.tpl && deviceTemplates !== prevProps.deviceTemplates && deviceTemplates.length) {
      const found = deviceTemplates.filter(p => (p.tags || []).includes('Server'))
      if (found.length) {
        this.setState({
          tpl: found[0]
        })
      }
    }

    // if (prevProps.addingDevice && !this.props.addingDevice) {
    //   if (this.props.addDeviceError) {
    //     // showAlert(this.props.addDeviceError)
    //   } else {
    //     const query = parse(this.props.location.search)
    //     if (query.from === 'servers') {
    //       this.props.history.push('/dashboard/servers')
    //     }
    //   }
    // }
  }

  onChangeDistribution (value) {
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
    const check = () => new Promise(resolve => {
      this.props.addDevice(params, url, resolve)
    })
    return check().then(({success, error}) => {
      if (!success) {
        if (error.indexOf('resolve') >= 0) {
          throw new SubmissionError({ wanip: error, _error: 'Add failed!' })
        } else {
          showAlert(error)
        }
      } else {
        const query = parse(this.props.location.search)
        if (query.from === 'servers') {
          this.props.history.push('/dashboard/servers')
        }
      }
    })
  }

  render () {
    const {tpl} = this.state
    const {addingDevice} = this.props
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
      <div style={addingDevice ? nonScrollStyle : null}>
        <DeviceWizardContainer
          noModal
          templateName={tpl.name}
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
