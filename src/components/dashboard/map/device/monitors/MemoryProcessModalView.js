import React from 'react'
import {Button} from '@material-ui/core'

import {Modal, CardPanel} from 'components/modal/parts'

export default class MemoryProcessModalView extends React.Component {
  render () {
    const {table, onHide} = this.props
    return (
      <Modal title="Process" onRequestClose={onHide} contentStyle={{width: 900}}>
        <CardPanel>
          <div style={{height: 300, overflow: 'auto'}}>
            {table}
          </div>
        </CardPanel>
        <div className="margin-md-top text-right">
          <Button variant="flat" onClick={onHide}>Close</Button>
        </div>
      </Modal>
    )
  }
}