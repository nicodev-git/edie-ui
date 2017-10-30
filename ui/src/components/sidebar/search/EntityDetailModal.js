import React from 'react'

import EntityDetailModalView from './EntityDetailModalView'
import {removeNullValues} from 'components/common/CellRenderers'

export default class EntityDetailModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowNull: false
    }
  }

  getEntity () {
    let detailEntity = {...this.props.detailEntity}
    if (!this.state.isShowNull)
      detailEntity = removeNullValues(detailEntity)

    delete detailEntity.highlights
    delete detailEntity['entity.id']

    return detailEntity
  }

  onCheckShowNull (e, checked) {
    this.setState({
      isShowNull: checked
    })
  }

  onHide () {
    this.props.showEntityDetailModal(false)
  }

  renderValue (raw) {
    const {detailEntity} = this.props
    let i = 2
    let path = ''
    while(i < arguments.length - 2) {
      path = `${arguments[i]}${path ? '.' : ''}${path}`
      i++
    }

    const highlight = path ? detailEntity.highlights[path] : ''
    if (highlight) {
      return <span dangerouslySetInnerHTML={{__html: `${highlight}`}}/>
    }
    return raw
  }

  render () {
    return (
      <EntityDetailModalView
        detailEntity={this.getEntity()}
        onHide={this.onHide.bind(this)}
        isShowNull={this.state.isShowNull}
        onCheckShowNull={this.onCheckShowNull.bind(this)}
        valueRenderer={this.renderValue.bind(this)}
      />
    )
  }
}
