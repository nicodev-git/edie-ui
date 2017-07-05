import React from 'react'
import {Dialog, FlatButton} from 'material-ui'

export default class MemoryProcessModalView extends React.Component {
  render () {
    const {table, onHide} = this.props
    return (
      <Dialog open title="Process" onRequestClose={onHide} contentStyle={{width: 900}}>
        <div style={{height: 300, overflow: 'auto'}}>
          {table}
        </div>
        <div className="margin-md-top text-right">
          <FlatButton label="Close" onTouchTap={onHide}/>
        </div>
      </Dialog>
    )
  }
}