import React from 'react'

import {SearchFieldsModalView} from 'components/modal'

class SearchFieldsModal extends React.Component {
  render () {
    return (
      <SearchFieldsModalView
        {...this.props}
      />
    )
  }
}

export default SearchFieldsModal