import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import GenericSearch from 'components/page/content/search/GenericSearch'

import {
  updateSearchParams,
  openFieldsPopover,
  closeFieldsPopover,
  fetchFieldTopValues
} from 'actions'

@withRouter
@connect(
  state => ({
    params: state.search.params,
    fields: state.search.fields,
    fieldPopoverOpen: state.search.fieldPopoverOpen,
    selectedField: state.search.selectedField,
    anchorEl: state.search.anchorEl,
    fieldTopValues: state.search.fieldTopValues
  }),
  dispatch => ({
    ...bindActionCreators({
      updateSearchParams,
      openFieldsPopover,
      closeFieldsPopover,
      fetchFieldTopValues
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
