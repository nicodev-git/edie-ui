import React from 'react'
import {Button} from 'material-ui'

export default class DoneButton extends React.Component {
  render () {
    return (
      <div className="text-right" style={{position: 'absolute', bottom: 16, right: 16}}>
        <Button variant="raised" label="Done" onClick={this.props.onClick}/>
      </div>
    )
  }
}
