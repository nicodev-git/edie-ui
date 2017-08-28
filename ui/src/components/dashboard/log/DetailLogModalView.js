import React from 'react'

import { Modal } from 'components/modal/parts'

export default class DetailLogModalView extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <Modal title="Log" onRequestClose={onHide} contentStyle={{width: 1058, maxWidth: 'initial'}}>

      </Modal>
    )
  }
}
