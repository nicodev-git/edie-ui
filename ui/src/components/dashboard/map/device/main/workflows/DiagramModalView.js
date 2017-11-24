import React, { Component } from 'react'

import { TwoButtonsBlockCustom, Modal } from 'components/modal/parts'

export default class DiagramModalView extends Component {
  render () {
    const {header, onHide, onSave, dragLayer, toolbar, sidebar,
      panel, objectModal, noModal} = this.props
    const content = (
      <div>
        <div className="diagram">
          {dragLayer}
          {toolbar}
          <div className="flex-horizontal">
            {sidebar}
            {panel}
          </div>
        </div>
        {objectModal}
        <TwoButtonsBlockCustom name2="Save" action2={onSave}/>
      </div>
    )
    if (noModal) return content
    return (
      <Modal title={header} onRequestClose={onHide}>
        {content}
      </Modal>
    )
  }
}
