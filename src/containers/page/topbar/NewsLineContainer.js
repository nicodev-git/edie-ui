import React, { Component } from 'react'
import NewsLine from '../../../components/page/topbar/NewsLine'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux' // Not needed now

class NewsLineContainer extends Component {
  render () {
    return (
      <NewsLine {...this.props} />
    )
  }
}

export default connect(
  state => ({ /* select state elements to props */ }),
  dispatch => ({ /* place actions here */ })
)(NewsLineContainer)
