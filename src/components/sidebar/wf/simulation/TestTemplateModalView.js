import React from 'react'

import {
  Modal,
  CardPanel
} from 'components/modal/parts'
import AppletCard from 'components/common/AppletCard'
import { appletColors as colors } from 'shared/Global'

export default class TestTemplateModalView extends React.Component {
  renderTpl (tpl, i) {
    const {onClickTpl} = this.props
    return (
      <AppletCard
        key={i}
        color={colors[(i + 1) % colors.length]}
        name={tpl.name}
        desc=""
        img={`/images/${tpl.img}`}
        onClick={() => onClickTpl(tpl)}
        verified
      />
    )
  }

  render () {
    const {onClickClose, messageTypes} = this.props
    return (
      <Modal
        title="Message" onRequestClose={onClickClose}
        contentStyle={{width: 1058, maxWidth: 'initial'}}>
        <CardPanel title="Message">
          <ul className="web-applet-cards">
            {messageTypes.map(this.renderTpl.bind(this))}
          </ul>
        </CardPanel>
      </Modal>
    )
  }
}