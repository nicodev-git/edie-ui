import React from 'react'

import ProductModalView from './ProductModalView'

export default class ProductModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render () {
    const {onClickClose} = this.props
    return (
      <ProductModalView
        {...this.props}
        onClickClose={onClickClose}
      />
    )
  }
}
