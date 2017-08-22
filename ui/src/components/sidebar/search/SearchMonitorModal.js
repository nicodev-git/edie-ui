import React from 'react'
import SearchMonitorModalView from './SearchMonitorModalView'

export default class SearchMonitorModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  onClickRow (selected) {
    this.setState({selected})
  }
  onClickOK () {

  }

  onClickClose () {
    this.props.showSearchMonitorModal(false)
  }

  render () {
    return (
      <SearchMonitorModalView
        allDevices={this.props.allDevices}
        selected={this.state.selected}
        onClickOK={this.onClickOK.bind(this)}
        onClickClose={this.onClickClose.bind(this)}
        onClickRow={this.onClickRow.bind(this)}
      />
    )
  }
}
