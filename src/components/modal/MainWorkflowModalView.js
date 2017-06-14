import React, { Component } from 'react'
import {Dialog} from 'material-ui'

export default class MainWorkflowModalView extends Component {
  render () {
    const {onSubmit, wizard} = this.props
    return (
      <Dialog open title="Workflow">
        <form onSubmit={onSubmit}>
          {wizard}
        </form>
      </Dialog>
    )
  }
}
