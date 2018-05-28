import React from 'react'
import {Select, MenuItem, Button} from '@material-ui/core'

import { Modal, CardPanel } from 'components/modal/parts'

export default class DashboardPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dashboardId: props.selected || ''
    }
  }

  onChangeDashboard (e) {
    this.setState({
      dashboardId: e.target.value
    })
  }

  onHide () {
    this.props.onHide()
  }

  onClickOK () {
    this.props.onClickOK(this.state.dashboardId)
    this.onHide()
  }

  render () {
    const {gaugeBoards} = this.props
    return (
      <Modal title="Dashboard" onHide={this.onHide.bind(this)}>
        <CardPanel title="Dashboard">
          <Select value={this.state.dashboardId} onChange={this.onChangeDashboard.bind(this)}>
            <MenuItem value="">[None]</MenuItem>
            {gaugeBoards.map(p =>
              <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
            )}
          </Select>
        </CardPanel>
        <div className="form-buttons">
          <Button variant="raised" onClick={this.onClickOK.bind(this)}>
            OK
          </Button>
        </div>
      </Modal>
    )
  }
}