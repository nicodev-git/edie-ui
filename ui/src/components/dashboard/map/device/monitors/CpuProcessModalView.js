import React from 'react'
import {Dialog, FlatButton} from 'material-ui'

export default class CpuProcessModalView extends React.Component {
  render () {
    const {table, onHide} = this.props
    return (
      <Dialog open title="Process" onRequestClose={onHide}>
        <div style={{height: 300}}>
          {table}
        </div>
        <div className="margin-md-bottom">
          <FlatButton label="Close" onTouchTap={onHide}/>
        </div>
      </Dialog>
    )
  }
}
