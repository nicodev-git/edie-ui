import React from 'react'

import { Modal } from 'components/modal/parts'
import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors } from 'shared/Global'

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
      <Modal title="Gauge" onRequestClose={onHide} contentStyle={{width: 1258, maxWidth: 'initial'}}>
        <div style={{marginTop: 40}} className="flex-horizontal">
          <div style={{width: 200}}>
            <ul className="padding-md-left">
              <li>Dashboards</li>
              <li>Devices</li>
              <li>Monitors</li>
            </ul>
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
