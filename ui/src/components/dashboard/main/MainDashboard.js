import React from 'react'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'

export default class MainDashboard extends React.Component {
  componentWillMount () {
    this.props.fetchGaugeBoards()
  }
  getTabs () {
    const tabs = this.props.gaugeBoards.map(p => ({
      title: p.name
    }))

    return [
      ...tabs, {
        title: 'Add'
      }
    ]
  }
  onClickAdd () {

  }
  onClickTab (index) {

  }
  render () {
    return (
      <TabPage>
        <div className="pull-right">
          <IconButton onTouchTap={this.onClickAdd.bind(this)}><AddCircleIcon /></IconButton>
        </div>
        <TabPageBody tabs={this.getTabs()} tab={1} transparent onClickTab={this.onClickTab.bind(this)}>
        </TabPageBody>
      </TabPage>
    )
  }
}
