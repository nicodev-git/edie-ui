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
    const { selectedCategory, workflowFilter } = this.props
    return this.props.workflows.filter(m =>
      (!selectedCategory || m.category === selectedCategory) &&
      (
        !workflowFilter ||
        !!m.name.match(new RegExp(workflowFilter, 'i')) ||
        !!m.desc.match(new RegExp(workflowFilter, 'i'))
      )
    )
  }

  onChangeWorkflowFilter (e) {
    this.props.changeSeachWfFilter(e.target.value)
  }

  onClickRow (workflow) {
    this.props.selectWfRow(workflow)
  }

  render () {
    return (
      <WorkflowSelectModalView
        {...this.props}
        workflows={this.getWorkflows()}
        onChangeWorkflowFilter={this.onChangeWorkflowFilter.bind(this)}
        onChangeCategory={this.onChangeCategory.bind(this)}
        onClickRow={this.onClickRow.bind(this)}
        onClickClose={this.onClickClose.bind(this)}
      />
    )
  }
}

export default WorkflowSelectModal
