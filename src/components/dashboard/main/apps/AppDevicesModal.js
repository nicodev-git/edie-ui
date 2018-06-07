import React from 'react'
import axios from 'axios'

import {ROOT_URL} from 'actions/config'
import AppDevicesModalView from './AppDevicesModalView'

export default class AppDevicesModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      devices: []
    }
  }
  componentWillMount () {
    axios.get(`${ROOT_URL}/findBasicInfo`, {
      params: {
        deviceIds: this.props.devices.map(p => p.id).join(',')
      }
    }).then(res => {
      this.setState({
        devices: res.data.map(p => {
          const data = {
            id: p.device.id,
            name: p.device.name,
            os: 'Windows',
            ip: p.device.wanip || p.device.lanip
          }

          if (p.data) {
            data.os = p.data.OS.Name
          }

          return data
        })
      })
    })
  }
  render () {
    const {onHide, selectedApp} = this.props
    return (
      <AppDevicesModalView
        devices={this.state.devices}
        onHide={onHide}
        selectedApp={selectedApp}
      />
    )
  }
}
