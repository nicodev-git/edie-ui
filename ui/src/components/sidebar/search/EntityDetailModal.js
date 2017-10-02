import React from 'react'
// import {keys} from 'lodash'

import EntityDetailModalView from './EntityDetailModalView'

export default class EntityDetailModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowNull: false
    }
  }

  getEntity () {
    const {detailEntity} = this.props
    return detailEntity
    // if (this.state.isShowNull) return detailEntity

    // keys(detailEntity)
    //entity[key] === null
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
