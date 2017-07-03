import React from 'react'
import {Dialog} from 'material-ui'

export default class SavedSearchEditModalView extends React.Component {
  render () {
    const {onClickClose} = this.props
    return (
      <Dialog open title="Saved Search" onRequestClose={onClickClose}>
        Edit
      </Dialog>
    )
  }
}
