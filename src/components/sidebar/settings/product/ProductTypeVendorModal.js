import React from 'react'

import ProductTypeVendorModalView from './ProductTypeVendorModalView'
import ProductTypeModal from './ProductTypeModal'

export default class ProductTypeVendorModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      typeModalOpen: false,
      editType: null,

      vendorModalOpen: false,
      editVendor: null
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

  ///////////////////////////////////////////////////////////////////

  onClickAddVendor () {
    this.setState({
      vendorModalOpen: true,
      editVendor: null
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
    this.props.removeProductVendor(editVendor)
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
      <ProductTypeModal
        editVendor={this.state.editVendor}
        onSave={this.onSaveVendor.bind(this)}
        onClose={() => this.setState({vendorModalOpen: false})}
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


        onClickAddVendor={this.onClickAddVendor.bind(this)}
        onClickEditVendor={this.onClickEditVendor.bind(this)}
        onClickDeleteVendor={this.onClickDeleteVendor.bind(this)}
      >
        {this.renderTypeModal()}
        {this.renderVendorModal()}
      </ProductTypeVendorModalView>
    )
  }
}
