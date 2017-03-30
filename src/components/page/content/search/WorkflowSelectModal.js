import React from 'react'

import { WorkflowSelectModalView } from 'components/modal'

class WorkflowSelectModal extends React.Component {
  componentWillMount () {
    this.props.fetchWorkflowCategories()
  }

  onClickClose () {
    this.props.closeSearchWfModal()
  }

  onChangeCategory (e, i, val) {
    this.props.selectSearchWfCategory(val)
  }

  getWorkflows () {
    const { selectedCategory } = this.props
    return this.props.workflows.filter(m => (!selectedCategory || m.category === selectedCategory))
  }

  onClickOK () {
    // const workflows = this.props.selectedSysWorkflows.map(workflow => assign({}, workflow, {id: null, isGlobal: false, origin: 'USER'}))
    // this.props.addDeviceWorkflows(workflows, this.props.device)
  }

  render () {
    return (
      <WorkflowSelectModalView
        {...this.props}
        workflows={this.getWorkflows()}
        onChangeCategory={this.onChangeCategory.bind(this)}
        onClickClose={this.onClickClose.bind(this)}
        onClickOK={this.onClickOK.bind(this)}
      />
    )
  }
}

export default WorkflowSelectModal
