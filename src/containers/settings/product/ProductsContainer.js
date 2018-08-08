import React from 'react'
import Products from 'components/sidebar/settings/product/Products'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  fetchVendorProducts,
  addVendorProduct,
  updateVendorProduct,
  removeVendorProduct,

  fetchBrainCells,
  fetchWorkflows,

  addWorkflow,
  updateWorkflow
} from 'actions'

class ProductsContainer extends React.Component {
  render () {
    return (
      <Products {...this.props} />
    )
  }
}
export default connect(
  state => ({
    vendorProducts: state.settings.vendorProducts,

    brainCells: state.settings.brainCells,
    workflows: state.workflow.workflows,
  }), {
    fetchVendorProducts,
    addVendorProduct,
    updateVendorProduct,
    removeVendorProduct,

    fetchBrainCells,
    fetchWorkflows,

    addWorkflow,
    updateWorkflow
  }
)(withRouter(ProductsContainer))
