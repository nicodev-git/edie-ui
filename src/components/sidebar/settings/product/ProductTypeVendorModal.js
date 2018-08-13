import React from 'react'
import {find} from 'lodash'

import ProductTypeVendorModalView from './ProductTypeVendorModalView'
import ProductTypeModal from './ProductTypeModal'
import ProductVendorModal from './ProductVendorModal'
import ProductVendorPickModal from './ProductVendorPickModal'
import ProductEditModal from './ProductEditModal'

export default class ProductTypeVendorModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedTypeId: null,
      typeModalOpen: false,
      editType: null,

      selectedVendorId: null,
      vendorModalOpen: false,
      editVendor: null,
      vendorPickModalOpen: false,

      editProduct: null,
      productModalOpen: false
    }
  }

  componentWillMount() {
    this.props.fetchProductTypes()
    this.props.fetchProductVendors()
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
    if (!window.confirm('Click OK to remove')) return
    this.props.removeProductType(editType)
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

  onSelectType (type) {
    this.setState({
      selectedTypeId: type ? type.id : null,
      selectedVendorId: null
    })
  }

  getSelectedType () {
    const {selectedTypeId} = this.state
    const {productTypes} = this.props
    if (!selectedTypeId) return null
    const type = find(productTypes, {id: selectedTypeId})
    return type
  }

  ///////////////////////////////////////////////////////////////////

  onClickAddVendor () {
    const type = this.getSelectedType()
    if (!type) return alert('Please choose product type first.')
    this.setState({
      vendorPickModalOpen: true
      // vendorModalOpen: true,
      // editVendor: null
    })
  }

  onClickEditVendor (editVendor) {
    this.setState({
      vendorModalOpen: true,
      editVendor
    })
  }

  onClickDeleteVendor (editVendor) {
    if (!window.confirm('Click OK to remove')) return
    const type = this.getSelectedType()
    if (type) {
      const vendorIds = type.vendorIds || []
      this.props.updateProductType({
        ...type,
        vendorIds: vendorIds.filter(p => p !== editVendor.id)
      })
    } else {
      this.props.removeProductVendor(editVendor)
    }
  }

  onSaveVendor (entity) {
    if (entity.id) {
      this.props.updateProductVendor(entity)
    } else {
      this.props.addProductVendor(entity)
    }
    this.setState({
      vendorModalOpen: false
    })
  }

  onSelectVendor (vendor) {
    this.setState({
      selectedVendorId: vendor.id
    })
  }

  getSelectedVendor() {
    const {selectedVendorId} = this.state
    const {productVendors} = this.props
    if (!selectedVendorId) return null
    return find(productVendors, {id: selectedVendorId})
  }

  ///////////////////////////////////////////////////////////////////

  addNewVendorIdToType(type, vendorId) {
    const vendorIds = type.vendorIds || []
    this.props.updateProductType({
      ...type,
      vendorIds: [...vendorIds, vendorId]
    })
  }

  onAddNewVendorToType (entity) {
    const type = this.getSelectedType()
    if (!type) return
    this.props.addProductVendor(entity, vendor => {
      if (vendor) this.addNewVendorIdToType(type, vendor.id)
    })
    this.onCloseVendorPick()
  }

  onPickVendorForType (vendorId) {
    const type = this.getSelectedType()
    if (!type) return
    let {vendorIds} = type
    if (!vendorIds) vendorIds = []
    if (vendorIds.indexOf(vendorId) >= 0) return alert('Already added')
    this.addNewVendorIdToType(type, vendorId)
    this.onCloseVendorPick()
  }

  onCloseVendorPick () {
    this.setState({
      vendorPickModalOpen: false
    })
  }

  getFilteredProductVendors () {
    const {selectedTypeId} = this.state
    const {productVendors} = this.props
    if (!selectedTypeId) return productVendors
    const type = this.getSelectedType()
    if (!type) return []
    const ids = type.vendorIds || []
    return productVendors.filter(p => ids.includes(p.id))
  }

  ///////////////////////////////////////////////////////////////////

  onClickAddProduct () {
    const {selectedVendorId} = this.state
    if (!selectedVendorId) return window.alert('Please select vendor')
    this.setState({
      productModalOpen: true
    })
  }

  onSaveProduct (entity) {
    const vendor = this.getSelectedVendor()
    if (!vendor) return null
    if (entity.id) {
      this.props.updateVendorProduct(entity)
    } else {
      this.props.addVendorProduct(entity, product => {
        if (product) this.addNewProductIdToVendor(vendor, product.id)
      })
    }
    this.setState({
      productModalOpen: false
    })
  }

  addNewProductIdToVendor(vendor, productId) {
    const productIds = vendor.productIds || []
    this.props.updateProductVendor({
      ...vendor,
      productIds: [...productIds, productId]
    })
  }

  getFilteredProducts () {
    const {vendorProducts} = this.props
    const vendor = this.getSelectedVendor()
    if (!vendor) return []
    const ids = vendor.productIds || []
    return vendorProducts.filter(p => ids.includes(p.id))
  }

  ///////////////////////////////////////////////////////////////////

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

  renderVendorModal () {
    if (!this.state.vendorModalOpen) return null
    return (
      <ProductVendorModal
        editVendor={this.state.editVendor}
        onSave={this.onSaveVendor.bind(this)}
        onClose={() => this.setState({vendorModalOpen: false})}
      />
    )
  }

  renderEditModal () {
    if (!this.state.productModalOpen) return null
    return (
      <ProductEditModal
        editVendor={this.state.editProduct}
        onSave={this.onSaveProduct.bind(this)}
        onClose={() => this.setState({productModalOpen: false})}
      />
    )
  }

  renderVendorPickModal () {
    if (!this.state.vendorPickModalOpen) return null
    const {productVendors} = this.props
    return (
      <ProductVendorPickModal
        productVendors={productVendors}
        onAdd={this.onAddNewVendorToType.bind(this)}
        onPick={this.onPickVendorForType.bind(this)}
        onClose={this.onCloseVendorPick.bind(this)}
      />
    )
  }

  render () {
    const {onClickClose} = this.props
    return (
      <ProductTypeVendorModalView
        {...this.props}
        onClickClose={onClickClose}

        selectedTypeId={this.state.selectedTypeId}
        onSelectType={this.onSelectType.bind(this)}

        onClickAddType={this.onClickAddType.bind(this)}
        onClickEditType={this.onClickEditType.bind(this)}
        onClickDeleteType={this.onClickDeleteType.bind(this)}


        selectedVendorId={this.state.selectedVendorId}
        onSelectVendor={this.onSelectVendor.bind(this)}

        filteredVendors={this.getFilteredProductVendors()}
        onClickAddVendor={this.onClickAddVendor.bind(this)}
        onClickEditVendor={this.onClickEditVendor.bind(this)}
        onClickDeleteVendor={this.onClickDeleteVendor.bind(this)}

        filteredProducts={this.getFilteredProducts()}
        onClickAddProduct={this.onClickAddProduct.bind(this)}
      >
        {this.renderTypeModal()}
        {this.renderVendorModal()}
        {this.renderVendorPickModal()}
        {this.renderEditModal()}
      </ProductTypeVendorModalView>
    )
  }
}
