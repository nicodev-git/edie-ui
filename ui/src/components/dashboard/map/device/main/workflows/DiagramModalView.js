import React, { Component } from 'react'

import { TwoButtonsBlock, Modal } from 'components/modal/parts'

export default class DiagramModalView extends Component {
  render () {
    const {header, onHide, onSave, dragLayer, toolbar, sidebar,
      panel, objectModal} = this.props
    return (
      <Modal title={header} onRequestClose={onHide}>
        <div className="diagram">
          {dragLayer}
          {toolbar}
          <div className="flex-horizontal">
            {sidebar}
            {panel}
          </div>
        </div>
        {objectModal}
        <TwoButtonsBlock onSave={onSave} onClose={onHide}/>
      </Modal>
    )
  }
}
