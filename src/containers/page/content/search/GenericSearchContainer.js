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
  removeSearchOption
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

    userInfo: state.dashboard.userInfo,
    envVars: state.settings.envVars
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
      removeSearchOption
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
