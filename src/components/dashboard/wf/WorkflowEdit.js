import React from 'react'
import { DragDropContext } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'

import WorkflowEditModal from './WorkflowEditModal'
import {drawFlows} from './DiagramLoader'
import {extendShape} from './diagram/DiagramItems'

class WorkflowEditDiagram extends React.Component {
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
        const data = drawFlows(flow.flowItems || [], this.props.shapes.map(p => extendShape(p)))
        this.props.openDeviceWfDiagramModal('workflow', JSON.stringify(data), flow)
        console.log(flow)
      }
    })
  }
  componentDidUpdate (prevProps) {
    const {match} = this.props
    const {name} = match.params
    if (name !== prevProps.match.params.name) {
      this.props.closeDeviceWfDiagramModal('workflow')
      this.openWorkflow(name)
    }
  }

  render () {
    const {wfDiagramModalOpen, shapes} = this.props
    if (!wfDiagramModalOpen) return <div>Loading...</div>

    return (
      <div className="flex-vertical flex-1">
        <WorkflowEditModal
        {...this.props}
        workflowItems={shapes.map(p => extendShape(p))}
        noModal/>
      </div>
    )
  }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(WorkflowEditDiagram)
