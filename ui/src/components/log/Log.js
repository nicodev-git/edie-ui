import React from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'

export default class Log extends React.Component {
  componentWillMount () {
    this.props.fetchDevicesGroups()
  }
  getLogMonitors () {
    const {allDevices} = this.props
    const monitors = []
    allDevices.forEach(p => {
      if (!p.monitors) return
      p.monitors.forEach(m => {
        if (m.monitortype === 'logfile') monitors.push(m)
      })
    })

    return monitors
  }

  renderMonitorList (monitors) {
    return (
      <div>
        {monitors.map(m =>
          <div key={m.uid} className="padding-sm bt-gray">
            <span className="link">{m.name}</span>
          </div>
        )}
      </div>
    )
  }

  render () {
    const monitors = this.getLogMonitors()
    return (
      <TabPage>
        <div className="padding-md">
          <span className="tab-title">Log</span>
        </div>

        <TabPageBody tabs={[]} history={this.props.history} location={this.props.location}>
          <div className="flex-horizontal" style={{height: '100%'}}>
            <div style={{minWidth: 200}}>
              <div className="header-blue">Log</div>
              {this.renderMonitorList(monitors)}
            </div>
            <div className="flex-1">
              <div className="header-red">Content</div>
            </div>
          </div>
        </TabPageBody>
      </TabPage>
    )
  }
}
