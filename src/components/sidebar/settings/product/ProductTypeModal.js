import React from 'react'
import ProductTypeModalView from './ProductTypeModalView'

export default class ProductTypeModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render () {
    const {onClickClose} = this.props
    return (
      <ProductTypeModalView>

      </ProductTypeModalView>
    )
  }
}
