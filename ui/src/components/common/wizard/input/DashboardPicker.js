import React from 'react'
import {SelectField, MenuItem} from 'material-ui'

import { Modal, CardPanel } from 'components/modal/parts'

export default class DashboardPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  onHide () {
    this.props.onHide()
  }

  onClickOK () {

  }

  render () {
    const {dashboards} = this.props
    return (
      <Modal title="Dashboard" onHide={this.onHide.bind(this)}>
        <CardPanel title="Dashboard">
          <SelectField value={}>
            {dashboards.map(p =>
              <MenuItem primaryText={p.name} value={p.id}/>
            )}
          </SelectField>
        </CardPanel>
      </Modal>
    )
  }
}