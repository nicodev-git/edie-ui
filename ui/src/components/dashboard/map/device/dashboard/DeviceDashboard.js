import React from 'react'
import {concat, assign, findIndex} from 'lodash'
import {RaisedButton} from 'material-ui'

import GaugePanel from './GaugePanel'
// import GaugeWizardContainer from 'containers/shared/wizard/GaugeWizardContainer'

export default class DeviceDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    this.props.fetchGroupDevicesAndLines(this.props.device.id)
    this.props.fetchSysSearchOptions()
  }

  getGauges () {
    const {mapDevices} = this.props
    return mapDevices.filter(p => p.params && !!p.params.graph)
  }

  getUserSearchOptions () {
    const {userInfo} = this.props
    if (!userInfo) return []
    const {searchOptions} = userInfo
    if (!searchOptions) return []
    try {
      return JSON.parse(searchOptions)
    } catch (e) {
      console.log(e)
    }
    return []
  }

  getSearchList () {
    const {sysSearchOptions} = this.props
    return concat([], this.getUserSearchOptions().map(p => {
      return assign({}, p, {
        type: 'User'
      })
    }), sysSearchOptions.map(p => {
      return assign({}, p, {
        type: 'System'
      })
    }))
  }

  getSavedSearch (id) {
    const userOptions = this.getUserSearchOptions()
    let index = findIndex(userOptions, {id})
    if (index >= 0) return userOptions[index]

    const {sysSearchOptions} = this.props
    index = findIndex(sysSearchOptions, {id})
    if (index >= 0) return sysSearchOptions[index]

    return null
  }

  onClickAddGauge () {

  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderDeviceWizard () {
    if (!this.state.deviceWizardVisible) return null

    const {options, callback, closeCallback} = this.state.deviceWizardConfig

    const extra = {
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
      image: options.imgName,
      templateName: options.templateName,
      groupid: this.props.device.id
    }

    if (options.dashboard) {
      return (
        <GaugeWizardContainer
          deviceType={options.type}
          onClose={() => {
            this.setState({deviceWizardVisible: false})
            closeCallback && closeCallback()
          }}
          title={options.title}
          monitors={options.monitors}
          extraParams={extra}
          onFinish={this.onFinishAddWizard.bind(this, callback)}
        />
      )
    }

    return (
      <DeviceWizardContainer
        deviceType={options.type}
        onClose={() => {
          this.setState({deviceWizardVisible: false})
          closeCallback && closeCallback()
        }}
        title={options.title}
        monitors={options.monitors}
        extraParams={extra}
        configParams={{}}
        onFinish={this.onFinishAddWizard.bind(this, callback)}
      />
    )
  }

  renderGauge (p) {
    const savedSearch = this.getSavedSearch(p.params.savedSearch)
    if (!savedSearch) return null
    const searchParams = JSON.parse(savedSearch.data)
    return (
      <GaugePanel key={p.id} gauge={p} searchParams={searchParams} searchList={this.getSearchList()}/>
    )
  }

  render () {
    return (
      <div className="padding-md-top">
        {this.getGauges().map(p => this.renderGauge(p))}
        <RaisedButton label="Add" onTouchTap={this.onClickAddGauge.bind(this)} className="margin-md-left"/>
      </div>
    )
  }
}
