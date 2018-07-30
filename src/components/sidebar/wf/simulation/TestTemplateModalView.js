import React from 'react'

import {
  FormInput,
  Modal,
  SubmitBlock,
  CardPanel
} from 'components/modal/parts'
import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors } from 'shared/Global'

export default class TestTemplateModalView extends React.Component {
  renderTpl (tpl, i) {
    const {onClickType} = this.props
    return (
      <AppletCard
        key={i}
        color={colors[(i + 1) % colors.length]}
        name={tpl.name}
        desc=""
        img={`/images/${tpl.img}`}
        onClick={() => onClickType(tpl)}
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
        <ul className="web-applet-cards" style={{marginTop: 40}}>
          {messageTypes.map(this.renderTpl.bind(this))}
        </ul>
      </Modal>
    )
  }
}