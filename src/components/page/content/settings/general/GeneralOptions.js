import React from 'react'
import {
    ButtonGroup,
    Button
} from 'react-bootstrap'

export default class OptionPanel extends React.Component {
  render () {
    return (
      <div className="tab-header">
        <div>
          <span className="tab-title">Settings</span>
        </div>
        <div className="text-center margin-md-top">
          <div style={{position: 'absolute', right: '25px'}}>
            <ButtonGroup>

              <Button>System Backup</Button>

              <Button>System Restore</Button>

            </ButtonGroup>
          </div>
        </div>
      </div>
    )
  }
}
