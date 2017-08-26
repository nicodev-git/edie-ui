import React from 'react'

export default class GaugePickerView extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <Modal title="Devices" onRequestClose={onHide} contentStyle={{width: 1058, maxWidth: 'initial'}}>
        <ul className="web-applet-cards" style={{marginTop: 40}}>

        </ul>
      </Modal>
    )
  }
}
