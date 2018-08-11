import React from 'react'
import {find} from 'lodash'

import {Select, MenuItem, InputLabel, FormControl, Button} from '@material-ui/core'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import {hasPermission} from 'shared/Permission'

import VendorProductModal from './VendorProductModal'
import ProductTypeVendorModal from './ProductTypeVendorModal'

export default class Tags extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedProductId: '',
      productModalOpen: false,
      editProduct: null,
      productTypeVendorModalOpen: false
    }
  }
  componentWillMount () {
    this.props.fetchVendorProducts()
    this.props.fetchBrainCells()
    this.props.fetchWorkflows()
  }

  onChangeProduct (e) {
    const selectedProductId = e.target.value
    const {vendorProducts} = this.props
    this.setState({
      selectedProductId
    })
    if (selectedProductId) {
      const product = find(vendorProducts, {id: selectedProductId})
      if (product) {
        this.setState({
          productModalOpen: false,
          editProduct: null,
        }, () => {
          this.setState({
            productModalOpen: true,
            editProduct: product
          })
        })
      }
    }
  }

  onClickAdd () {
    this.setState({
      productModalOpen: false,
      editProduct: null,
      selectedProductId: ''
    }, () => {
      this.setState({
        editProduct: null,
        productModalOpen: true
      })
    })
  }

  onClickDelete () {
    const {selectedProductId} = this.state
    const {vendorProducts} = this.props
    const product = find(vendorProducts, {id: selectedProductId})

    console.log(product)
    if (!product || !window.confirm('Click OK to remove.')) return

    this.setState({
      selectedProductId: '',
      productModalOpen: false
    })
    this.props.removeVendorProduct(product)
  }

  onSaveProduct (values) {
    const {editProduct} = this.state
    if (editProduct) {
      this.props.updateVendorProduct({
        ...editProduct,
        ...values
      })
    } else {
      this.props.addVendorProduct(values)
      this.setState({
        productModalOpen: false
      })
    }
  }

  onCloseProductModal () {
    this.setState({
      productModalOpen: false
    })
  }

  ///////////////////////////////////////////////////////////////

  onClickProductTypeVendor () {
    this.setState({
      productTypeVendorModalOpen: true
    })
  }

  ///////////////////////////////////////////////////////////////

  renderProductCombo () {
    const {vendorProducts} = this.props
    return (
      <FormControl style={{minWidth: 100}}>
        <InputLabel>Products</InputLabel>
        <Select value={this.state.selectedProductId} onChange={this.onChangeProduct.bind(this)}>
          {vendorProducts.map(p =>
            <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
          )}
        </Select>
      </FormControl>
    )
  }

  renderProductModal () {
    if (!this.state.productModalOpen) return null
    return (
      <VendorProductModal
        {...this.props}
        editProduct={this.state.editProduct}
        onSave={this.onSaveProduct.bind(this)}
        onClose={this.onCloseProductModal.bind(this)}
      />
    )
  }

  renderProductTypeVendorModal () {
    if (!this.state.productTypeVendorModalOpen) return null
    return (
      <ProductTypeVendorModal
        {...this.props}
        onClickClose={() => this.setState({productTypeVendorModalOpen: false})}
      />
    )
  }

  render () {
    const {userInfo} = this.props
    const {selectedProductId} = this.state
    const canEdit = hasPermission(userInfo, 'EditSettings')
    return (
      <TabPage>
        <TabPageHeader title="Products">
          <div className="margin-md-top">
            {this.renderProductCombo()}
            <div className="pull-right">
              {canEdit && <Button variant="raised" onClick={this.onClickProductTypeVendor.bind(this)}>Product</Button>}

              {canEdit && <Button variant="raised" onClick={this.onClickAdd.bind(this)}>Add</Button>}
              {canEdit && selectedProductId && <Button variant="raised" onClick={this.onClickDelete.bind(this)}>Delete</Button>}&nbsp;
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={6} history={this.props.history} location={this.props.location} transparent>
          {this.renderProductModal()}
          {this.renderProductTypeVendorModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}