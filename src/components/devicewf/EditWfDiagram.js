import React from 'react'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import DiagramModalContainer from 'containers/wf/DiagramModalContainer'

export default class EditWfDiagram extends React.Component {
  componentWillMount () {
    this.props.setWorkflow(null)
    this.props.fetchWorkflow(this.getWorkflowId())
  }

  componentDidUpdate (prevProps) {
    const {editWorkflow} = this.props
    if (!prevProps.editWorkflow && editWorkflow) {
      this.props.openDeviceWfDiagramModal(editWorkflow.flowchart || '')
    }
  }

  getWorkflowId () {
    return this.props.match.params.id
  }
  getWorkflow () {
    return null
  }

  onDiagramSave (flowchart) {
    const {editWorkflow} = this.props
    if (!editWorkflow) return
    this.props.updateDeviceWorkflow({
      ...editWorkflow,
      flowchart
    })
  }

  onDiagramModalClose (flowchart) {
    // const {editWorkflow} = this.props
    // if (!editWorkflow) return
    // this.props.updateDeviceWorkflow({
    //   ...editWorkflow,
    //   flowchart
    // })
    //
    // this.props.history.push(`/${this.props.match.params.device}/editwf/${this.getWorkflowId()}`)
  }

  //////////////////////////////////////////////////////////

  renderContent () {
    const {editWorkflow} = this.props
    if (!this.props.wfDiagramModalOpen) return null
    return (
      <DiagramModalContainer
        noModal
        commands={editWorkflow.actions.map(a => a.command)}
        onSave={this.onDiagramSave.bind(this)}
        onClose={this.onDiagramModalClose.bind(this)}
      />
    )
  }
  render () {
    const {editWorkflow} = this.props
    if (!editWorkflow) return <div>Loading...</div>
    return (
      <TabPage>
        <div style={{margin: '16px 20px 0'}}>
          <span className="tab-title">Diagram</span>
        </div>

        <TabPageBody tabs={[]} history={this.props.history} location={this.props.location} transparent>
          {this.renderContent()}
        </TabPageBody>
      </TabPage>
    )
  }
}
