import React from 'react'
import FlowPickerModalView from './FlowPickerModalView'

export default class FlowPickerModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: null
    }
  }
  componentWillMount () {
    this.props.fetchWorkflows()
  }

  onClickRow (selected) {
    this.setState({
      selected
    })
  }

  onClickOK () {
    this.props.onClickOK(this.state.selected)
  }

  getWorkflows () {
    const {device, workflows} = this.props
    if (!device) return workflows
  }


  render () {
    return (
      <FlowPickerModalView
        selected={this.state.selected}
        workflows={this.props.workflows}
        onClickRow={this.onClickRow.bind(this)}
        onClickClose={this.props.onClickClose}
        onClickOK={this.onClickOK.bind(this)}
      />
    )
  }
}