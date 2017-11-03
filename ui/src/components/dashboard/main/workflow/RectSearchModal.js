import React from 'react'

import RectSearchModalView from './RectSearchModalView'

export default class RectSearchModal extends React.Component {
  getParams () {

  }
  onRowDblClick () {

  }
  render () {
    const {onHide} = this.props
    return (
      <RectSearchModalView
        onHide={onHide}
        params={this.getParams()}
        onRowDblClick={this.onRowDblClick.bind(this)}
      />
    )
  }
}
