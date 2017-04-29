import React from 'react'

import SavedSearchModalView from 'components/modal'

export default class SavedSearchModal extends React.Component {
  render () {
    return (
      <SavedSearchModalView
        {...this.props}
      />
    )
  }
}
