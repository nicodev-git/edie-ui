import React from 'react'
import {find} from 'lodash'

import {Select, MenuItem, InputLabel, FormControl, Button} from '@material-ui/core'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import {hasPermission} from 'shared/Permission'

import VendorProductModal from './VendorProductModal'

export default class Tags extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedProductId: '',
      productModalOpen: false,
      editProduct: null
    }
  }
  componentWillMount () {
    this.props.fetchVendorProducts()
    this.props.fetchBrainCells()
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
          editProduct: null
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
      editProduct: null,
      productModalOpen: true
    })
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
    }
  }

  onCloseProductModal () {
    this.setState({
      productModalOpen: false
    })
  }

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

  render () {
    const {userInfo} = this.props
    const canEdit = hasPermission(userInfo, 'EditSettings')
    return (
      <TabPage>
        <TabPageHeader title="Products">
          <div className="margin-md-top">
            {this.renderProductCombo()}
            <div className="pull-right">
              {canEdit && <Button variant="raised" onClick={this.onClickAdd.bind(this)}>Add</Button>}
              {/*{canEdit && <Button variant="raised" onClick={this.onEditTag.bind(this)}>Edit</Button>}&nbsp;*/}
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={8} history={this.props.history} location={this.props.location}>
          {this.renderProductModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}