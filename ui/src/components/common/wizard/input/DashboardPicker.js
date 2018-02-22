import React from 'react'
import {Select, MenuItem, Button} from 'material-ui'

import { Modal, CardPanel } from 'components/modal/parts'

export default class DashboardPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dashboardId: props.selected || ''
    }
  }

  onChangeDashboard (e, index, value) {
    this.setState({
      dashboardId: value
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
            <MenuItem primaryText="[None]" value=""/>
            {gaugeBoards.map(p =>
              <MenuItem key={p.id} primaryText={p.name} value={p.id}/>
            )}
          </Select>
        </CardPanel>
        <div className="form-buttons">
          <Button variant="raised" label="OK" onTouchTap={this.onClickOK.bind(this)} />
        </div>
      </Modal>
    )
  }
}