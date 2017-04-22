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

  showThreats
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
    selectedRowWf: state.search.selectedRowWf
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

      showThreats
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
