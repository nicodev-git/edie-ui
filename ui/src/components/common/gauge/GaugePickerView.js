import React from 'react'

import { Modal } from 'components/modal/parts'
import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors } from 'shared/Global'

export default class GaugePickerView extends React.Component {
  renderTpl (tpl, i) {
    return (
      <AppletCard
        key={tpl.id}
        color={colors[i % colors.length]}
        name={''}
        desc={tpl.name}
        img={`${extImageBaseUrl}${tpl.image}`}
      />
    )
  }

  render () {
    const {onHide, gauges} = this.props
    return (
      <Modal title="Gauge" onRequestClose={onHide} contentStyle={{width: 1058, maxWidth: 'initial'}}>
        <ul className="web-applet-cards" style={{marginTop: 40}}>
          {gauges.map(this.renderTpl.bind(this))}
        </ul>
      </Modal>
    )
  }
}
