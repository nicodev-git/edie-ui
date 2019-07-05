import React from 'react'

import RectSearchModalView from './RectSearchModalView'

export default class RectSearchModal extends React.Component {
  onRowDblClick (data) {
    this.props.showEntityDetailModal(true, data)
  }
  render () {
    const {onHide, params} = this.props
    return (
      <RectSearchModalView
        onHide={onHide}
        name={params.name}
        params={params.searchParams}
        onRowDblClick={this.onRowDblClick.bind(this)}
      />
    )
  }
}
