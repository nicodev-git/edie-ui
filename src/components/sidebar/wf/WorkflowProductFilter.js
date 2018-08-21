import React from 'react'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {MenuItem, Select, Checkbox} from '@material-ui/core'
import {find} from 'lodash'

import {productFilterTypes} from 'shared/Global'
import {Field} from "redux-form";

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
      vendorProducts, productTypes, productVendors,

      filterType, onChangeFilterType,
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
        <FormControl>
          <InputLabel>Product Type</InputLabel>
          <Select
            value={productTypeId}
            onChange={onChangeProductType}
            style={{width: 150}}
            MenuProps={menuProps}
          >
            {productTypes.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Product Vendor</InputLabel>
          <Select
            value={productVendorId}
            onChange={onChangeProductVendor}
            style={{width: 150}}
            MenuProps={menuProps}
          >
            {vendors.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Product</InputLabel>
          <Select
            value={productId}
            onChange={onChangeProduct}
            style={{width: 150}}
            MenuProps={menuProps}
          >
            {products.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
    )
  }

  render () {
    const {
      vendorProducts, productTypes, productVendors,

      filterType, onChangeFilterType,
      productTypeId, onChangeProductType,
      productVendorId, onChangeProductVendor,
      productId, onChangeProduct
    } = this.props

    return (
      <div className="inline-block margin-md-left">
        <FormControl className="margin-md-right">
          <InputLabel>Filter Type</InputLabel>
          <Select
            value={filterType}
            onChange={onChangeFilterType}
            style={{width: 150}}
            MenuProps={menuProps}
          >
            {productFilterTypes.map(p => <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>)}
          </Select>
        </FormControl>


        {filterType === 'PRODUCT' ? (
          this.renderProductCombos()
        ) : (
          <FormControl>
            <InputLabel>Product Type</InputLabel>
            <Select
              value={productTypeId}
              onChange={onChangeProductType}
              style={{width: 150}}
              MenuProps={menuProps}
            >
              {productTypes.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
            </Select>
          </FormControl>
        )}
      </div>
    )
  }
}