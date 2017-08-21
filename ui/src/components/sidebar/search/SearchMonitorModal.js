import React from 'react'
import SearchMonitorModalView from './SearchMonitorModalView'

export default class SearchMonitorModal extends React.Component {
  render () {
    return (
      <SearchMonitorModalView
        {...this.props}
        onClickOK={this.onClickOK.bind(this)}
      />
    )
  }
}
