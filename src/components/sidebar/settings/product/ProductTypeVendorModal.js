import React from 'react'

import ProductTypeVendorModalView from './ProductTypeVendorModalView'
import ProductTypeModal from './ProductTypeModal'

export default class ProductTypeVendorModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      typeModalOpen: false,
      editType: null
    }
  }

  componentWillMount() {
    this.props.fetchProductTypes()
  }

  onClickAddType () {
    this.setState({
      typeModalOpen: true,
      editType: null
    })
  }

  render () {
    const {onClickClose} = this.props
    return (
      <ProductTypeVendorModalView
        {...this.props}
        onClickClose={onClickClose}
        onClickAddType={this.onClickAddType.bind(this)}
      >

      </ProductTypeVendorModalView>
    )
  }
}
