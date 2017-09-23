import React from 'react'
import {SelectField, MenuItem} from 'material-ui'

export default class ServerCombo extends React.Component {
  getServers () {
    const {devices, allDevices} = this.props
    return (devices || allDevices).filter(p => (p.tags || []).includes('Server'))
  }
  onChangeValue (e, index, value) {
    this.props.history.push(`/serverdetail/${value}`)
  }

  render () {
    const {deviceId} = this.props
    const servers = this.getServers()
    return (
      <SelectField value={deviceId} onChange={this.onChangeValue.bind(this)}>
        {servers.map(p =>
          <MenuItem key={p.id} primaryText={p.name} value={p.id}/>
        )}
      </SelectField>
    )
  }
}
