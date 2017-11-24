import React from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import {getRanges} from 'components/common/DateRangePicker'
import {showPrompt} from 'components/common/Alert'

export default class DeviceWf extends React.Component {
  renderDevices () {

  }
  renderWorkflows () {

  }
  render () {
    return (
      <TabPage>
        <div style={{margin: '16px 20px 0'}}>
          <span className="tab-title">Device Workflows</span>
        </div>

        <TabPageBody tabs={[]} history={this.props.history} location={this.props.location} transparent>
          <div className="flex-horizontal" style={{height: '100%'}}>
            <div className="flex-vertical" style={{minWidth: 300, marginRight: 5}}>
              <div className="header-blue relative margin-xs-right">Device</div>
              <div className="flex-1 paper-bg">
                {this.renderDevices()}
              </div>
            </div>
            <div className="flex-vertical flex-1" style={{overflow: 'auto'}}>
              <div className="header-red margin-xs-right">Workflows</div>
              <div className="flex-1 flex-vertical paper-bg">
                {this.renderWorkflows()}
              </div>
            </div>
          </div>
        </TabPageBody>
      </TabPage>
    )
  }
}
