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

  onClickEditType (editType) {
    this.setState({
      typeModalOpen: true,
      editType
    })
  }

  onClickDeleteType (editType) {

  }

  onSaveType (entity) {
    if (entity.id) {
      this.props.updateProductType(entity)
    } else {
      this.props.addProductType(entity)
    }
    this.setState({
      typeModalOpen: false
    })
  }

  renderTypeModal () {
    if (!this.state.typeModalOpen) return null
    return (
      <ProductTypeModal
        editType={this.state.editType}
        onSave={this.onSaveType.bind(this)}
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
        onClickEditType={this.onClickEditType.bind(this)}
        onClickDeleteType={this.onClickDeleteType.bind(this)}
      >
        {this.renderTypeModal()}
      </ProductTypeVendorModalView>
    )
  }
}
