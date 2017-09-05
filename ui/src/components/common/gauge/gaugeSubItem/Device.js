import React from 'react'
import {IconButton} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'

import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors } from 'shared/Global'

export default class Device extends React.Component {
  onClickAddDevice () {

  }

  renderTpl (tpl, i) {
    const {onClickMenuItem} = this.props
    return (
      <AppletCard
        key={tpl.id}
        color={colors[i % colors.length]}
        name={tpl.templateName}
        desc={tpl.name}
        img={`${extImageBaseUrl}${tpl.image}`}
        onClick={() => onClickMenuItem(tpl)}
      />
    )
  }
  renderAddMenu () {
    return (
      <div className="text-right" style={{position: 'absolute', top: -45, right: 0}}>
        <IconButton onTouchTap={this.onClickAddDevice.bind(this)}>
          <AddCircleIcon />
        </IconButton>
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.renderAddMenu()}
        <ul className="web-applet-cards">
          {this.props.devices.map(this.renderTpl.bind(this))}
        </ul>
      </div>
    )
  }
}