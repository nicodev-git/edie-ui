import React from 'react'

import { Modal } from 'components/modal/parts'

export default class DeviceMonitorsModalView extends React.Component {
  render () {
    const {onHide, onClickPrev, onClickNext} = this.props
    return (
      <Modal title="Log" onRequestClose={onHide} contentStyle={{width: '90%', maxWidth: 'initial'}}>
        <div>
          <RaisedButton label="Prev" onTouchTap={onClickPrev}/>
          <RaisedButton label="Next" onTouchTap={onClickNext}/>
        </div>
        {this.renderTable()}
      </Modal>
    )
  }
}
