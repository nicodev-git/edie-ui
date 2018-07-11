import React from 'react'
import uuid from 'uuid'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import WorkflowEditModal from './WorkflowEditModal'

export default class WorkflowAdd extends React.Component {
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
  }


  onSaveName (values) {
    const flow = {
      ...values,
      uuid: uuid.v4(),
      flowItems: []
    }
    this.props.addWorkflow(flow)
    this.props.history.push('/workflow')
  }

  getTags () {
    const {brainCells} = this.props
    return brainCells.filter(p => p.type === 'Tag')
  }

  render () {
    return (
      <TabPage>
        <TabPageHeader title="Workflow Edit">
        </TabPageHeader>

        <TabPageBody transparent>
          <WorkflowEditModal
            {...this.props}
            noModal
            allTags={this.getTags()}
            editWf={null}
            onSave={this.onSaveName.bind(this)}
          />
        </TabPageBody>
      </TabPage>
    )
  }
}