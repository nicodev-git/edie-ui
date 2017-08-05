import React from 'react'
import ViewFilterModalView from './ViewFilterModalView'

export default class ViewFilterModal extends React.Component {
  componentWillMount () {
    this.props.selectViewFilter(null)
  }
  onClickOK () {
    const {selectedViewFilter} = this.props
    if (!selectedViewFilter) {
      //return window.alert('Please select filter.')
      this.onClickClose()
      return
    }
    this.props.updateSearchViewFilter(selectedViewFilter)
    this.onClickClose()
  }
  onClickClose () {
    this.props.showViewFilterModal(false)
  }
  render () {
    return (
      <ViewFilterModalView
        cols={this.props.cols}
        viewCols={this.props.viewCols}
        selectedViewFilter={this.props.selectedViewFilter}
        selectViewFilter={this.props.selectViewFilter}
        toggleViewCol={this.props.toggleViewCol}
        onClickOK={this.onClickOK.bind(this)}
        onClickClose={this.onClickClose.bind(this)}
      />
    )
  }
}
