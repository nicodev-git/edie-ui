import React from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'

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

  renderContent () {

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
