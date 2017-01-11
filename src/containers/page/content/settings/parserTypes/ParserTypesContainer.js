import React from 'react'

import ParserTypes from 'components/page/content/settings/parserTypes/ParserTypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  openParserTypeModal,
  fetchParserTypes
} from 'actions'

@connect(
  state => ({
    parserTypes: state.settings.parserTypes,
    parserTypeModalOpen: state.settings.parserTypeModalOpen
  }),
  dispatch => ({
    ...bindActionCreators({
      openParserTypeModal,
      fetchParserTypes
    }, dispatch)
  })
)
export default class ParserTypesContainer extends React.Component {
  render () {
    return (
      <ParserTypes {...this.props} />
    )
  }
}
