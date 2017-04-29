import React from 'react'

import {SavedSearchModalView} from 'components/modal'

export default class SavedSearchModal extends React.Component {
  componentWillMount () {
    this.props.fetchSysSearchOptions()
  }
  onClickClose () {
    this.props.showSavedSearch(false)
  }
  onClickOK () {
  }
  onClickRow (p) {
    this.props.selectSearch(p)
  }
  render () {
    return (
      <SavedSearchModalView
        {...this.props}
        onClickRow={this.onClickRow.bind(this)}
        onClickOK={this.onClickOK.bind(this)}
        onClickClose={this.onClickClose.bind(this)}
      />
    )
  }
}
