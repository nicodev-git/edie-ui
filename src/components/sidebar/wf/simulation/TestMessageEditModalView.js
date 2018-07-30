import React from 'react'

import {
  FormInput,
  Modal,
  SubmitBlock,
  CardPanel
} from 'components/modal/parts'
import AppletCard from 'components/common/AppletCard'

export default class TestMessageEditModalView extends React.Component {
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