import React, { Component } from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import ServerDetailTab from './ServerDetailTab'
import StatusImg from './StatusImg'

import FloatingMenu from 'components/common/floating/FloatingMenu'
import ProductPickModal from 'components/sidebar/settings/product/ProductPickModal'

export default class DeviceProductsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productPickOpen: false
    }
  }
  componentWillMount() {
    this.props.fetchVendorProducts()
  }

  onClickAdd () {
    this.setState({
      productPickOpen: true
    })
  }

  getProducts() {
    const {device, vendorProducts} = this.props
    if (!device || !device.productIds) return []
    return vendorProducts.filter(p => device.productIds.includes(p.id))
  }

  ///////////////////////////////////////////////////////

  onCloseProductPick () {
    this.setState({
      productPickOpen: false
    })
  }

  onPickProduct (product) {
    console.log(product)
    this.onCloseProductPick()
  }

  ///////////////////////////////////////////////////////

  renderProductPick () {
    if (!this.state.productPickOpen) return null
    return (
      <ProductPickModal
        products={this.props.vendorProducts}
        onPick={this.onPickProduct.bind(this)}
        onClose={this.onCloseProductPick.bind(this)}
      />
    )
  }

  renderBody () {
    const products = this.getProducts()
    return (
      <div className="bg-white" style={{height: '100%', overflow: 'auto'}}>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {products.map(p =>
            <tr key={p.id}>
              <td>{p.name}</td>
              <td></td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }

  render () {
    const {device} = this.props
    return (
      <TabPage>
        <TabPageHeader title="Products" useToolBar titleOptions={<StatusImg device={device}/>}>
        </TabPageHeader>
        <TabPageBody tabs={ServerDetailTab(device.slug, device.templateName)} history={this.props.history} location={this.props.location} transparent>
          {this.renderBody()}
          <FloatingMenu onClickMain={this.onClickAdd.bind(this)}/>
          {this.renderProductPick()}
        </TabPageBody>
      </TabPage>
    )
  }
}
