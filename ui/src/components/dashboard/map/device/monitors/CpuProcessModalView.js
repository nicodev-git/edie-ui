import React from 'react'
import {FlatButton} from 'material-ui'

import {Modal} from 'components/modal/parts'

export default class CpuProcessModalView extends React.Component {
  render () {
    const {table, onHide} = this.props
    return (
      <Modal title="Process" onRequestClose={onHide} contentStyle={{width: 900}}>
        <div style={{height: 300, overflow: 'auto'}}>
          {table}
        </div>
        <div className="margin-md-top text-right">
          <FlatButton label="Close" onTouchTap={onHide}/>
        </div>
      </Modal>
    )
  }
}
