import React, { Component } from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import ServerDetailTab from './ServerDetailTab'
import StatusImg from './StatusImg'

import FloatingMenu from 'components/common/floating/FloatingMenu'

export default class DeviceProductsTable extends Component {
  componentWillMount() {
    this.props.fetchVendorProducts()
  }


  onClickAdd () {

  }

  getProducts() {
    const {device} = this.props
    if (!device || !device.productIds) return []

  }

  renderBody () {
    return (
      <div className="bg-white" style={{height: '100%', overflow: 'auto'}}>
        Device Products
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
        </TabPageBody>
      </TabPage>
    )
  }
}
