import React from 'react'
import {Dialog, FlatButton} from 'material-ui'

export default class CpuProcessModalView extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <Dialog open title="Process" onRequestClose={onHide}>
        Process List
        <div className="margin-md-bottom">
          <FlatButton label="Close" onTouchTap={onHide}/>
        </div>
      </Dialog>
    )
  }
}
