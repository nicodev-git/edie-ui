import React from 'react'

import {SearchFieldsModalView} from 'components/modal'

class SearchFieldsModal extends React.Component {
  onClickOK () {
  }
  onClickClose () {
    this.props.showSearchFieldsModal(false)
  }
  onRowSelection (selectedRows) {
    const {fields} = this.props
  }
  render () {
    return (
      <SearchFieldsModalView
        {...this.props}
        onRowSelection={this.onRowSelection.bind(this)}
        onClickOK={this.onClickOK.bind(this)}
        onClickClose={this.onClickClose.bind(this)}
      />
    )
  }
}

export default SearchFieldsModal
