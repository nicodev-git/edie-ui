import React from 'react'

import {SavedSearchModalView} from 'components/modal'

export default class SavedSearchModal extends React.Component {
  componentWillMount () {
    this.props.fetchSysSearchOptions()
    this.props.selectSearch(null)
  }
  onClickClose () {
    this.props.showSavedSearch(false)
  }
  onClickOK () {
    const {selectedSearch} = this.props
    if (!selectedSearch) return null
    this.props.onChangeSearchOption(selectedSearch)
    this.onClickClose()
  }
  onClickRow (p) {
    this.props.selectSearch(p)
  }
  onClickShare (p) {
    const props = {
      name: p.name,
      data: p.data,
      description: '',
      origin: 'USER'
    }
  }
  render () {
    return (
      <SavedSearchModalView
        {...this.props}
        onClickRow={this.onClickRow.bind(this)}
        onClickOK={this.onClickOK.bind(this)}
        onClickClose={this.onClickClose.bind(this)}
        onClickShare={this.onClickShare.bind(this)}
      />
    )
  }
}
