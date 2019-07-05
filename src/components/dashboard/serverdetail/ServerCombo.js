import React from 'react'
import {findIndex} from 'lodash'
import {Select, MenuItem} from '@material-ui/core'

export default class ServerCombo extends React.Component {
  getServers () {
    const {allDevices} = this.props
    return (allDevices).filter(p => (p.tags || []).includes('Server'))
  }
  onChangeValue (e) {
    const {value} = e.target
    const servers = this.getServers()
    const index = findIndex(servers, {id: value})
    const device = servers[index]
    this.props.fetchDevice(value)
    this.props.history.push(`/dashboard/servers/${device.slug}/detail`)
  }

  render () {
    const {device} = this.props
    const servers = this.getServers()
    return (
      <div style={{position: 'absolute', marginTop: -10}}>
        <Select
          value={device.id}
          onChange={this.onChangeValue.bind(this)}
          style={{minWidth: 180}}
        >
          {servers.map(p =>
            <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
          )}
        </Select>
      </div>
    )
  }
}
