import React from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'

export default class Log extends React.Component {
  render () {
    return (
      <TabPage>
        <div className="padding-md">
          <span className="tab-title">Log</span>
        </div>

        <TabPageBody tabs={[]} history={this.props.history} location={this.props.location}>
          <div className="flex-horizontal" style={{height: '100%'}}>
            <div>
              <div className="header-blue">Log</div>
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
