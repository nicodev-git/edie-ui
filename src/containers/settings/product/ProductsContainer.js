import React from 'react'
import Products from 'components/sidebar/settings/product/Products'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  fetchVendorProducts,
  addVendorProduct,
  updateVendorProduct,
  removeVendorProduct,

  fetchWorkflows,
  addWorkflow,
  updateWorkflow,

  showBrainCellModal,
  addBrainCell,
  updateBrainCell,
  fetchBrainCells,
  showScriptModal,
  showGrokModal,
  showCellParamModal
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
    brainCellModalOpen: state.settings.brainCellModalOpen,
    editBrainCell: state.settings.editBrainCell,
    scriptModalOpen: state.settings.scriptModalOpen,
    grokModalOpen: state.settings.grokModalOpen,
    editCellParam: state.settings.editCellParam,
    cellParamModalOpen: state.settings.cellParamModalOpen,

    workflows: state.workflow.workflows,
  }), {
    fetchVendorProducts,
    addVendorProduct,
    updateVendorProduct,
    removeVendorProduct,

    fetchWorkflows,
    addWorkflow,
    updateWorkflow,

    showBrainCellModal,
    addBrainCell,
    updateBrainCell,
    fetchBrainCells,
    showScriptModal,
    showGrokModal,
    showCellParamModal
  }
)(withRouter(ProductsContainer))
