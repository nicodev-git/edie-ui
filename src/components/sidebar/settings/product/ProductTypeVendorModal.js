import React from 'react'

import ProductTypeVendorModalView from './ProductTypeVendorModalView'

export default class ProductTypeVendorModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentWillMount() {
    this.props.fetchProductTypes()
  }

  render () {
    const {onClickClose} = this.props
    return (
      <ProductTypeVendorModalView
        {...this.props}
        onClickClose={onClickClose}
      />
    )
  }
}
