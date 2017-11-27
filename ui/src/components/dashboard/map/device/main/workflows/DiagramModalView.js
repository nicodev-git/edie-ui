import React, { Component } from 'react'

import { TwoButtonsBlockCustom, Modal } from 'components/modal/parts'

export default class DiagramModalView extends Component {
  render () {
    const {header, onHide, onSave, dragLayer, toolbar, sidebar,
      panel, objectModal, noModal} = this.props
    const content = (
      <div className={`diagram ${noModal ? 'flex-vertical' : ''}`} style={noModal ? {height: '100%'} : null}>
        {dragLayer}
        {toolbar}
        <div className="flex-1 flex-horizontal">
          {sidebar}
          {panel}
        </div>
        {objectModal}
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
