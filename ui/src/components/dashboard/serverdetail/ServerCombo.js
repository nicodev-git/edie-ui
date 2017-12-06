import React from 'react'
// import {findIndex} from 'lodash'
import {SelectField, MenuItem} from 'material-ui'

export default class ServerCombo extends React.Component {
  getServers () {
    const {allDevices} = this.props
    return (allDevices).filter(p => (p.tags || []).includes('Server'))
  }
  onChangeValue (e, index, value) {
    const device = this.getServers()[index]
    this.props.fetchDevice(value)
    this.props.history.push(`/dashboard/servers/${device.slug}/detail`)
  }

  render () {
    const {device} = this.props
    const servers = this.getServers()
    return (
      <div style={{position: 'absolute', marginTop: -10}}>
        <SelectField value={device.id} onChange={this.onChangeValue.bind(this)}>
          {servers.map(p =>
            <MenuItem key={p.id} primaryText={p.name} value={p.id}/>
          )}
        </SelectField>
      </div>
    )
  }
}
