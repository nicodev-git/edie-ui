import React from 'react'

import {Modal} from 'components/modal/parts'

export default class GaugeEditModalView extends React.Component {
  render () {
    const {title, onHide} = this.props
    return (
      <Modal title={title} onRequestClose={onHide} contentStyle={{width: 1000, maxWidth: 'initial'}}>

      </Modal>
    )
  }
}
