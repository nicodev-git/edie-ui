import React from 'react'
import { Modal } from 'components/modal/parts'

import LiquidView from 'components/common/gauge/display/LiquidView'

export default class MonitorDetailModalView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: Math.ceil(Math.random() * 100)
    }
  }
  render () {
    const {onHide} = this.props
    return (
      <Modal title="Monitor" onRequestClose={onHide} contentStyle={{}}>
        <LiquidView value={this.state.value}/>
      </Modal>
    )
  }
}
