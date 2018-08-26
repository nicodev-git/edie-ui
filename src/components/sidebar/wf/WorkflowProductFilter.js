import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import {MenuItem, Select} from '@material-ui/core'
import {find} from 'lodash'

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 50 * 8,
    }
  }
}

export default class WorkflowProductFilter extends React.Component {
  renderProductCombos () {
    const {
      filterType,
      vendorProducts, productTypes, productVendors,

      productTypeId, onChangeProductType,
      productVendorId, onChangeProductVendor,
      productId, onChangeProduct
    } = this.props

    let vendors = productVendors || []
    if (productTypeId) {
      const type = find(productTypes, {id: productTypeId})
      if (type) vendors = vendors.filter(p => (type.vendorIds || []).includes(p.id))
    }
    let products = vendorProducts || []
    if (productVendorId) {
      const vendor = find(productVendors, {id: productVendorId})
      if (vendor) products = products.filter(p => (vendor.productIds || []).includes(p.id))
    }

    return (
      <div className="inline-block">
        <FormControl className={filterType === 'product-type' ? '' : 'hidden'}>
          <InputLabel shrink>Product Type</InputLabel>
          <Select
            value={productTypeId}
            onChange={onChangeProductType}
            style={{width: 150}}
            MenuProps={menuProps}
            displayEmpty
          >
            <MenuItem value="">[All]</MenuItem>
            {productTypes.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl className={filterType === 'product-vendor' ? '' : 'hidden'}>
        <InputLabel shrink>Product Vendor</InputLabel>
          <Select
            value={productVendorId}
            onChange={onChangeProductVendor}
            style={{width: 150}}
            MenuProps={menuProps}
            displayEmpty
          >
            <MenuItem value="">[All]</MenuItem>
            {productVendors.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl className={filterType === 'product' ? '' : 'hidden'}>
          <InputLabel shrink>Product</InputLabel>
          <Select
            value={productId}
            onChange={onChangeProduct}
            style={{width: 150}}
            MenuProps={menuProps}
            displayEmpty
          >
            <MenuItem value="">[All]</MenuItem>
            {vendorProducts.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
    )
  }

  render () {
    return (
      <div className="inline-block margin-md-left">
        {this.renderProductCombos()}
      </div>
    )
  }
}