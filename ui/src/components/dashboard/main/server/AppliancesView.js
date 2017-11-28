import React from 'react'
import ComputerIcon from 'material-ui/svg-icons/hardware/computer'
import {purple500, deepPurpleA400} from 'material-ui/styles/colors'

import FloatingMenu from 'components/common/floating/FloatingMenu'

const tplColors = [purple500, deepPurpleA400]

export default class AppliancesView extends React.Component {
  onClickAddItem (tpl) {
    this.props.history.push(`/addappliance`)
  }

  getMenuItems () {
    const items = [{
      label: 'Add Appliance',
      icon: <ComputerIcon/>,
      color: tplColors[0],
      onClick: this.onClickAddItem.bind(this)
    }]

    return items
  }

  render () {
    return (
      <div>
        <FloatingMenu menuItems={this.getMenuItems()}/>
      </div>
    )
  }
}
