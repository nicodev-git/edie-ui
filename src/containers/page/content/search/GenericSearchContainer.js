import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import GenericSearch from 'components/page/content/search/GenericSearch'

import {
  updateSearchParams,
  openFieldsPopover,
  closeFieldsPopover
} from 'actions'

@withRouter
@connect(
  state => ({
    params: state.search.params,
    fields: state.search.fields,
    fieldPopoverOpen: state.search.fieldPopoverOpen,
    selectedField: state.search.selectedField,
    anchorEl: state.search.anchorEl
  }),
  dispatch => ({
    ...bindActionCreators({
      updateSearchParams,
      openFieldsPopover,
      closeFieldsPopover
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
