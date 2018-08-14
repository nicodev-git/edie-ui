import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import Braincells from 'components/sidebar/settings/braincell/Braincells'
import {
  fetchBrainCells,
  addBrainCell,
  updateBrainCell,
  removeBrainCell,
  showBrainCellModal,
  showScriptModal,
  showGrokModal,
  showCellParamModal,

  fetchWorkflows,

  fetchVendorProducts,
  fetchProductTypes,
  fetchProductVendors
} from 'actions'

class BraincellsContainer extends React.Component {
  render() {
    return (
      <Braincells {...this.props} />
    )
  }
}

export default connect(
  state => ({
    brainCells: state.settings.brainCells,
    brainCellModalOpen: state.settings.brainCellModalOpen,
    editBrainCell: state.settings.editBrainCell,
    scriptModalOpen: state.settings.scriptModalOpen,
    grokModalOpen: state.settings.grokModalOpen,
    editCellParam: state.settings.editCellParam,
    cellParamModalOpen: state.settings.cellParamModalOpen,

    workflows: state.workflow.workflows,

    vendorProducts: state.settings.vendorProducts,
    productTypes: state.settings.productTypes,
    productVendors: state.settings.productVendors,
  }), {
    fetchBrainCells,
    addBrainCell,
    updateBrainCell,
    removeBrainCell,
    showBrainCellModal,
    showScriptModal,
    showGrokModal,
    showCellParamModal,

    fetchWorkflows,

    fetchVendorProducts,
    fetchProductTypes,
    fetchProductVendors
  }
)(withRouter(BraincellsContainer))
