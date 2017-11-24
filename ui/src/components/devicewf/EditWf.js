import React from 'react'

export default class EditWf extends React.Component {
  componentWillMount () {

  }

  getWorkflowId () {
    return this.props.match.params.id
  }
  getWorkflow () {
    return null
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}
