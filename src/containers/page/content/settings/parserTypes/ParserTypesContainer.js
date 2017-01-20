import React from 'react'

import ParserTypes from 'components/page/content/settings/parserTypes/ParserTypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  openParserTypeModal,
  fetchParserTypes,
  removeParserType,

  addParserType,
  updateParserType,
  closeParserTypeModal,

  openParserPatternModal,
  closeParserPatternModal
} from 'actions'

@connect(
  state => ({
    parserTypes: state.settings.parserTypes,
    parserTypeDraw: state.settings.parserTypeDraw,
    parserTypeModalOpen: state.settings.parserTypeModalOpen,

    editParserType: state.settings.editParserType,

    editPattern: state.settings.editParserPattern,
    patternModalOpen: state.settings.parserPatternModalOpen
  }),
  dispatch => ({
    ...bindActionCreators({
      openParserTypeModal,
      removeParserType,
      fetchParserTypes,

      addParserType,
      updateParserType,
      closeParserTypeModal,

      openParserPatternModal,
      closeParserPatternModal
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
