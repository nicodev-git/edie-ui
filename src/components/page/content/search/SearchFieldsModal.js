import React from 'react'

import {SearchFieldsModalView} from 'components/modal'

class SearchFieldsModal extends React.Component {
  onClickOK () {
    const {selectedSearchFields} = this.props
    if (!selectedSearchFields.length) return
    this.onClickClose()
    this.props.updateRelDeviceFields(selectedSearchFields)
  }
  onClickClose () {
    this.props.showSearchFieldsModal(false)
  }
  onRowSelection (selectedRows) {
    const {fields} = this.props
    this.props.updateSelectedSearchFields(selectedRows.map(i => fields[i].path))
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
