import React, { Component } from 'react'
import {Dialog} from 'material-ui'

export default class MainWorkflowModalView extends Component {
  render () {
    const {onSubmit, wizard, onClose} = this.props
    return (
      <Dialog open title="Workflow" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          {wizard}
        </form>
      </Dialog>
    )
  }
}
