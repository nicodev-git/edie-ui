import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import {
  updateSearchParams
} from 'actions'
import Events from 'components/page/content/search/Events'

@withRouter
@connect(
  state => ({
    keyword: state.search.keyword
  }),
  dispatch => ({
    ...bindActionCreators({
      updateSearchParams
    }, dispatch)
  })
)
export default class EventsContainer extends React.Component {
  render () {
    return (
      <Events {...this.props} />
    )
  }
}
