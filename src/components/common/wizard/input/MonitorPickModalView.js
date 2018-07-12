import React from 'react'

import { Modal } from 'components/modal/parts'
import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors } from 'shared/Global'

export default class MonitorPickModalView extends React.Component {
  renderTpl (tpl, i) {
    const {onClick} = this.props
    return (
      <AppletCard
        key={tpl.id}
        color={colors[(i + 1) % colors.length]}
        name={tpl.name}
        desc={tpl.description}
        img={`${extImageBaseUrl}${tpl.image}`}
        onClick={() => onClick(tpl)}
        verified
      />
    )
  }

  renderBasic () {
    const {onClickBasic} = this.props
    if (!onClickBasic) return null
    return (
      <AppletCard
        color={colors[0]}
        name="Basic"
        desc="Check basic info"
        img="/resources/images/dashboard/basic.png"
        onClick={onClickBasic}
        verified
      />
    )
  }

  render () {
    const {onHide} = this.props
    return (
      <Modal title="Monitors" onRequestClose={onHide} contentStyle={{width: 1058, maxWidth: 'initial'}}>
        <ul className="web-applet-cards" style={{marginTop: 40}}>
          {this.renderBasic()}
          {this.props.templates.map(this.renderTpl.bind(this))}
        </ul>
      </Modal>
    )
  }
}
