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
  render () {
    return (
      <EntityDetailModalView
        detailEntity={this.getEntity()}
        onHide={this.onHide.bind(this)}
        isShowNull={this.state.isShowNull}
        onCheckShowNull={this.onCheckShowNull.bind(this)}
      />
    )
  }
}
