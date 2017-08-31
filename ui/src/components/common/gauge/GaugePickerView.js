import React from 'react'
import {Drawer, IconButton} from 'material-ui'

import DashboardIcon from 'material-ui/svg-icons/action/dashboard'
import DeviceIcon from 'material-ui/svg-icons/device/devices'
import PlaylistIcon from 'material-ui/svg-icons/av/playlist-add-check'

import { Modal } from 'components/modal/parts'
import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors } from 'shared/Global'

import {sidebarWidth, sidebarStyle} from 'style/common/materialStyles'

export default class GaugePickerView extends React.Component {
  renderTpl (tpl, i) {
    const {onClickMenuItem} = this.props
    return (
      <AppletCard
        key={tpl.id}
        color={colors[i % colors.length]}
        name={''}
        desc={tpl.name}
        img={`${extImageBaseUrl}${tpl.image}`}
        onClick={() => onClickMenuItem(tpl)}
      />
    )
  }

  render () {
    const {onHide, gauges} = this.props
    return (
      <Modal title="Gauge" onRequestClose={onHide} contentStyle={{width: 1058 + sidebarWidth, maxWidth: 'initial'}}>
        <div style={{marginTop: 40, minHeight: 500}} className="flex-horizontal">
          <div style={{width: sidebarWidth}}>
            <Drawer open width={sidebarWidth} containerStyle={{...sidebarStyle, left: 'initial', bottom: 0, top: 56, height: 'initial'}}>
              <div>
                <IconButton><DashboardIcon color="#ffffff"/></IconButton>
              </div>
              <div>
                <IconButton><PlaylistIcon color="#ffffff"/></IconButton>
              </div>
              <div>
                <IconButton><DeviceIcon color="#ffffff"/></IconButton>
              </div>
            </Drawer>
          </div>
          <div className="flex-1">
            <ul className="web-applet-cards">
              {gauges.map(this.renderTpl.bind(this))}
            </ul>
          </div>

        </div>
      </Modal>
    )
  }
}
