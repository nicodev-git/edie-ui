import React from 'react'
import ViewFilterModalView from './ViewFilterModalView'

export default class ViewFilterModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTab: "pre"
    }
  }
  componentWillMount () {
    this.props.selectViewFilter(null)
  }
  onClickOK () {
    const {selectedViewFilter} = this.props
    if (!selectedViewFilter) {
      //return window.alert('Please select filter.')
      this.props.redrawSearch()
      this.onClickClose()
      return
    }
    this.props.updateSearchViewFilter(selectedViewFilter)

    this.props.redrawSearch()
    this.onClickClose()
  }
  onClickClose () {
    this.props.showViewFilterModal(false)
  }
  onChangeTab (e, selectedTab) {
    this.setState({selectedTab})
  }
  render () {
    return (
      <ViewFilterModalView
        cols={this.props.tableViewCols}
        viewCols={this.props.viewCols}
        selectedViewFilter={this.props.selectedViewFilter}
        selectViewFilter={this.props.selectViewFilter}
        toggleViewCol={this.props.toggleViewCol}
        onClickOK={this.onClickOK.bind(this)}
        onClickClose={this.onClickClose.bind(this)}

        selectedTab={this.state.selectedTab}
        onChangeTab={this.onChangeTab.bind(this)}
      />
    )
  }
}
