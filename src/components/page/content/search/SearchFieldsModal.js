import React from 'react'

import {SearchFieldsModalView} from 'components/modal'

class SearchFieldsModal extends React.Component {
  onClickOK () {
  }
  onClickClose () {
    this.props.showSearchFieldsModal(false)
  }
  render () {
    return (
      <SearchFieldsModalView
        {...this.props}
        onClickOK={this.onClickOK.bind(this)}
        onClickClose={this.onClickClose.bind(this)}
      />
    )
  }
}

export default SearchFieldsModal
