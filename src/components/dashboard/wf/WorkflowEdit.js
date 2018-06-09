import React from 'react'
import { DragDropContext } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'
import uuid from 'uuid'

import WorkflowEditModal from './WorkflowEditModal'

class WorkflowEditDiagram extends React.Component {
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

  }

  getTags () {
    const {brainCells} = this.props
    return brainCells.filter(p => p.type === 'Tag')
  }

  render () {
    const {editWf} = this.state
    if (!editWf) return <div>Loading...</div>

    return (
      <div className="flex-vertical flex-1">
        <WorkflowEditModal
          {...this.props}
          noModal
          allTags={this.getTags()}
          editWf={editWf}
          onSave={this.onSaveName.bind(this)}
        />
      </div>
    )
  }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(WorkflowEditDiagram)
