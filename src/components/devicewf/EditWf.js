import React from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import MainWorkflowModal from 'components/dashboard/map/device/main/workflows/MainWorkflowModal'

export default class EditWf extends React.Component {
  componentWillMount () {
    this.props.setWorkflow(null)
    this.props.fetchWorkflow(this.getWorkflowId())
  }

  getWorkflowId () {
    return this.props.match.params.id
  }
  getWorkflow () {
    return null
  }

  onClickDiagram () {
    this.props.history.push(`/${this.props.match.params.device}/editwf/diagram/${this.getWorkflowId()}`)
  }

  onFinish () {
    this.props.history.push('/devicewf')
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

        <TabPageBody tabs={[]} history={this.props.history} location={this.props.location} transparent>
          {this.renderContent()}
        </TabPageBody>
      </TabPage>
    )
  }
}
