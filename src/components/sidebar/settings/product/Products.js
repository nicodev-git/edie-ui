import React from 'react'

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
      selectedProductId: 'p1',
      productModalOpen: false,
      editProduct: null
    }
  }
  componentWillMount () {
    this.props.fetchVendorProducts()
  }

  onChangeProduct (e) {
    this.setState({
      selectedProductId: e.target.value
    })
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

    } else {
    }
  }

  renderProductCombo () {
    return (
      <FormControl style={{minWidth: 100}}>
        <InputLabel>Products</InputLabel>
        <Select value={this.state.selectedProductId} onChange={this.onChangeProduct.bind(this)}>
          <MenuItem value="p1">Product1</MenuItem>
          <MenuItem value="p2">Product2</MenuItem>
        </Select>
      </FormControl>
    )
  }

  renderProductModal () {
    if (!this.state.productModalOpen) return null
    return (
      <VendorProductModal
        {...this.props}
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