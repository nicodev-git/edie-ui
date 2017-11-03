import React from 'react'

import RectSearchModalView from './RectSearchModalView'

export default class RectSearchModal extends React.Component {
  onRowDblClick () {

  }
  render () {
    const {onHide, params} = this.props
    return (
      <RectSearchModalView
        onHide={onHide}
        params={params}
        onRowDblClick={this.onRowDblClick.bind(this)}
      />
    )
  }
}
