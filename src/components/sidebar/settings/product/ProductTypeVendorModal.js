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

  renderTypeModal () {
    if (!this.state.typeModalOpen) return null
    return (
      <ProductTypeModal
        onClose={() => this.setState({typeModalOpen: false})}
      />
    )
  }

  render () {
    const {onClickClose} = this.props
    return (
      <ProductTypeVendorModalView
        {...this.props}
        onClickClose={onClickClose}
        onClickAddType={this.onClickAddType.bind(this)}
      >
        {this.renderTypeModal()}
      </ProductTypeVendorModalView>
    )
  }
}
