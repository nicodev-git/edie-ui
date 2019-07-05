import React from 'react'

import EntityDetailModalView from './EntityDetailModalView'
import {removeNullValues, expandEntity, getHighlighted} from 'components/common/CellRenderers'

export default class EntityDetailModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowNull: false
    }
  }

  getEntity () {
    const {noHighlight} = this.props
    let detailEntity = {...this.props.detailEntity}
    if (!this.state.isShowNull)
      detailEntity = removeNullValues(detailEntity)
    if (!noHighlight) {
      detailEntity.entity = getHighlighted (detailEntity.entity, detailEntity.highlights)
      delete detailEntity.highlights
      delete detailEntity['entity.id']

      detailEntity = expandEntity(detailEntity)
    }
    return detailEntity
  }

  onCheckShowNull (e, checked) {
    this.setState({
      isShowNull: checked
    })
  }

  onHide () {
    const {onClose} = this.props
    if (onClose) return onClose()
    this.props.showEntityDetailModal(false)
  }

  labelRenderer (raw) {
    const val = raw ? raw[0] : ''
    return <span dangerouslySetInnerHTML={{__html: `${val || ''}:`}}/>
  }

  valueRenderer (raw) {
    return <span dangerouslySetInnerHTML={{__html: `${raw || ''}`}}/>
  }

  render () {
    return (
      <EntityDetailModalView
        detailEntity={this.getEntity()}
        onHide={this.onHide.bind(this)}
        isShowNull={this.state.isShowNull}
        onCheckShowNull={this.onCheckShowNull.bind(this)}
        labelRenderer={this.labelRenderer.bind(this)}
        valueRenderer={this.valueRenderer.bind(this)}
      />
    )
  }
}
