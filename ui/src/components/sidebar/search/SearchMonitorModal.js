import React from 'react'

import SearchMonitorModalView from './SearchMonitorModalView'
import { showAlert } from 'components/common/Alert'

export default class SearchMonitorModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: [],
      monitorTreeData: null
    }
  }

  onClickRow (monitor) {
    let {selected} = this.state
    if (selected.filter(p => p.uid === monitor.uid).length) {
      selected = selected.filter(p => p.id !== monitor.uid)
    } else {
      selected = [...selected, monitor]
    }
    this.setState({selected})
  }

  onClickOK () {
    const {selected} = this.state
    if (!selected.length) {
      showAlert('Please select monitor')
      return
    }
    this.props.onClickOK(selected)
  }

  onClickClose () {
    this.props.showSearchMonitorModal(false)
  }

  onClickShowAny () {
    this.props.onClickOK([])
  }

  render () {
    return (
      <SearchMonitorModalView
        allDevices={this.props.allDevices}
        selected={this.state.selected}
        onClickOK={this.onClickOK.bind(this)}
        onClickClose={this.onClickClose.bind(this)}
        onClickRow={this.onClickRow.bind(this)}
        onClickShowAny={this.onClickShowAny.bind(this)}

        monitorTreeData={this.state.monitorTreeData}
        onChangeTreeData={(monitorTreeData) => {this.setState({monitorTreeData})}}
      />
    )
  }
}
