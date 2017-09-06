import React from 'react'
import { Modal } from 'components/modal/parts'

import LiquidView from 'components/common/gauge/display/LiquidView'

const containerStyle = {
  height: 300,
  position: 'relative',
  marginTop: 40
}

export default class MonitorDetailModalView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: Math.ceil(Math.random() * 100)
    }
  }
  render () {
    const {onHide, title} = this.props
    return (
      <Modal title={title} onRequestClose={onHide} contentStyle={{}}>
        <div style={containerStyle}>
          <LiquidView value={this.state.value}/>
        </div>
      </Modal>
    )
  }
}
