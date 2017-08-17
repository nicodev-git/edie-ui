import React from 'react'
import {CardPanel, Modal} from 'components/modal/parts'

export default class GaugeModalView extends React.Component {
  render () {
    const {header, onHide, content} = this.props
    return (
      <Modal title={header} onRequestClose={onHide}>
        {content}
      </Modal>
    )
  }
}
