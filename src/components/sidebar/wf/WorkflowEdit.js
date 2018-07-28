import React from 'react'
import uuid from 'uuid'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import WorkflowEditModal from './WorkflowEditModal'

export default class WorkflowEdit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editWf: null
    }
  }
  componentWillMount () {
    this.props.fetchGroups()
    this.props.fetchShapes()
    this.props.fetchBrainCells()

    const {match} = this.props
    const {name} = match.params
    this.openWorkflow(name)
  }

  openWorkflow (name) {
    this.props.fetchWorkflowByName(name, flow => {
      if (flow) {
        this.setState({
          editWf: flow
        })
        console.log(flow)
      }
    })
  }
  componentDidUpdate (prevProps) {
    const {match} = this.props
    const {name} = match.params
    if (name !== prevProps.match.params.name) {
      this.setState({editWf: null})
      this.openWorkflow(name)
    }
  }

  onSaveName (values) {
    const {editWf} = this.state
    if (editWf) {
      this.props.updateWorkflow({
        ...editWf,
        ...values
      })
    } else {
      const flow = {
        ...values,
        uuid: uuid.v4(),
        flowItems: []
      }
      this.props.addWorkflow(flow)
    }

    this.props.history.push('/workflow')

  }

  getTags () {
    const {brainCells} = this.props
    return brainCells.filter(p => p.type === 'Tag')
  }

  render () {
    const {editWf} = this.state
    if (!editWf) return <div>Loading...</div>

    return (
      <TabPage>
        <TabPageHeader title="Workflow Edit">
        </TabPageHeader>

        <TabPageBody transparent>
          <WorkflowEditModal
            {...this.props}
            noModal
            allTags={this.getTags()}
            editWf={editWf}
            onSave={this.onSaveName.bind(this)}
          />
        </TabPageBody>
      </TabPage>
    )
  }
}
