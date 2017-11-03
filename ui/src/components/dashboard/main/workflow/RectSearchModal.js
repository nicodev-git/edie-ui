import React from 'react'

import RectSearchModalView from './RectSearchModalView'

export default class RectSearchModal extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <RectSearchModalView
        onHide={onHide}
      />
    )
  }
}
