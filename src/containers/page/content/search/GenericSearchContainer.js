import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import GenericSearch from 'components/page/content/search/GenericSearch'

import {
  updateSearchKeyword
} from 'actions'

@withRouter
@connect(
  state => ({
    keyword: state.search.keyword
  }),
  dispatch => ({
    ...bindActionCreators({
      updateSearchKeyword
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
