import React from 'react'
import Modal from 'components/modal/parts/Modal'
import CardPanel from "../modal/parts/CardPanel";

export default class LogFiltersModalView extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <Modal title="Filters" onRequestClose={onHide}>
        <CardPanel title="Filters">

        </CardPanel>
      </Modal>
    )
  }
}
