import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import GenericSearch from 'components/page/content/search/GenericSearch'

import {
  updateSearchParams
} from 'actions'

@withRouter
@connect(
  state => ({
    params: state.search.params
  }),
  dispatch => ({
    ...bindActionCreators({
      updateSearchParams
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
