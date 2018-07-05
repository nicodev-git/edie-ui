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

  render () {
    return (
      <FlowPickerModalView
        selected={this.state.selected}
        workflows={this.props.workflows}
        onClickRow={this.onClickRow.bind(this)}
        onClickClose={this.props.onClickClose}
      />
    )
  }
}