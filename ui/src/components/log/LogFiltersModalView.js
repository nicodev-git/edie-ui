import React from 'react'
import { Modal } from 'components/modal/parts'

export default class LogFiltersModalView extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <Modal title="Log Filters" onRequestClose={onHide}>

      </Modal>
    )
  }
}
