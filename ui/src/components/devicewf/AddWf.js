import React from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import MainWorkflowModal from 'components/dashboard/map/device/main/workflows/MainWorkflowModal'
import AddWfTabs from './AddWfTabs'

export default class AddWf extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tab:0
    }
  }
  componentWillMount () {
    // this.props.fetchDevice(this.getDeviceId())
  }

  getDeviceId () {
    return this.props.match.params.z
  }
  getDevice () {
    return null
  }

  onClickDiagram () {
    this.props.history.push(`/${this.props.match.params.device}/editwf/diagram/${this.getWorkflowId()}`)
  }

  onFinish () {
    this.props.history.push('/devicewf')
  }

  onClickTab (tab) {
    this.setState({
      tab
    })
  }

  ////////////////////////////////////////////////

  renderContent () {
    return (
      <MainWorkflowModal
        noModal
        onClickDiagram={this.onClickDiagram.bind(this)}
        onFinish={this.onFinish.bind(this)}
      />
    )
  }

  render () {
    const {editWorkflow} = this.props
    if (!editWorkflow) return <div>Loading...</div>
    return (
      <TabPage>
        <div style={{margin: '16px 20px 0'}}>
          <span className="tab-title">{editWorkflow.name}</span>
        </div>

        <TabPageBody tabs={AddWfTabs} tab={this.state.tab} onClickTab={this.onClickTab.bind(this)}>
          {this.renderContent()}
        </TabPageBody>
      </TabPage>
    )
  }
}
