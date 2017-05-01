import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import GenericSearch from 'components/page/content/search/GenericSearch'

import {
  updateSearchParams,
  fetchSearchFields,
  openFieldsPopover,
  closeFieldsPopover,
  fetchFieldTopValues,
  updateQueryChips,

  fetchSearchOptions,
  addSearchOption,
  updateSearchOption,
  removeSearchOption,
  fetchSysSearchOptions,
  showSavedSearch,
  selectSearch,

  openSearchSavePopover,
  closeSearchSavePopover,

  fetchWorkflows,
  fetchWorkflowCategories,
  openSearchWfModal,
  closeSearchWfModal,
  selectSearchWfCategory,
  changeSeachWfFilter,
  selectWfRow,
  selectSearchWf,
  addSearchWf,
  removeSearchWf,
  replaceSearchWfs,

  showThreats,
  showRelDevicesPopover,
  fetchRelDevices,
  showIrrelDevicesModal,
  fetchIrrelDevices
} from 'actions'

@withRouter
@connect(
  state => ({
    params: state.search.params,
    queryChips: state.search.queryChips,
    fields: state.search.fields,
    fieldPopoverOpen: state.search.fieldPopoverOpen,
    selectedField: state.search.selectedField,
    anchorEl: state.search.anchorEl,
    fieldTopValues: state.search.fieldTopValues,
    searchOptions: state.search.searchOptions,

    savePopoverOpen: state.search.savePopoverOpen,
    selectedOption: state.search.selectedOption,

    userInfo: state.dashboard.userInfo,
    envVars: state.settings.envVars,

    workflows: state.settings.workflows,
    workflowCategories: state.devices.workflowCategories,
    selectedCategory: state.search.selectedCategory,
    wfModalOpen: state.search.wfModalOpen,
    selectedWf: state.search.selectedWf,
    selectedWfs: state.search.selectedWfs,
    workflowFilter: state.search.workflowFilter,
    selectedRowWf: state.search.selectedRowWf,

    savedSearchModalOpen: state.search.savedSearchModalOpen,
    sysSearchOptions: state.search.sysSearchOptions,
    selectedSearch: state.search.selectedSearch,
    loadingSearchOptions: state.search.loadingSearchOptions,

    relDevicePopoverOpen: state.search.relDevicePopoverOpen,
    relDevices: state.search.relDevices,
    irrelDeviceModalOpen: state.search.irrelDeviceModalOpen,
    irrelDevices: state.search.irrelDevices
  }),
  dispatch => ({
    ...bindActionCreators({
      updateSearchParams,
      fetchSearchFields,
      openFieldsPopover,
      closeFieldsPopover,
      fetchFieldTopValues,
      updateQueryChips,

      fetchSearchOptions,
      addSearchOption,
      updateSearchOption,
      removeSearchOption,
      fetchSysSearchOptions,
      showSavedSearch,
      selectSearch,

      openSearchSavePopover,
      closeSearchSavePopover,

      fetchWorkflows,
      fetchWorkflowCategories,
      openSearchWfModal,
      closeSearchWfModal,
      selectSearchWfCategory,
      changeSeachWfFilter,
      selectWfRow,
      selectSearchWf,
      addSearchWf,
      removeSearchWf,
      replaceSearchWfs,

      showThreats,
      showRelDevicesPopover,
      fetchRelDevices,
      showIrrelDevicesModal,
      fetchIrrelDevices
    }, dispatch)
  })
)
export default class GenericSearchContainer extends React.Component {
  render () {
    return (
      <GenericSearch {...this.props}/>
    )
  }
}
