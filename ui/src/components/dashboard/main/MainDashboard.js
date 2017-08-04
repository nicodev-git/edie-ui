import React from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

export default class MainDashboard extends React.Component {
  componentWillMount () {
    this.props.fetchGaugeBoards()
  }
  getTabs () {
    return []
  }
  onClickTab (index) {

  }
  render () {
    return (
      <TabPage>
        <TabPageBody tabs={this.getTabs()} tab={1} transparent onClickTab={this.onClickTab.bind(this)}>
          {this.renderContent()}
          {this.renderAgentModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
