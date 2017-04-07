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
  closeParserPatternModal,

  openSimulationModal,
  closeSimulationModal,
  matchFilter,
  parseFilter,

  showFilterEditModal,
  showPatternEditModal,
  updateSimParserType
} from 'actions'

@connect(
  state => ({
    parserTypes: state.settings.parserTypes,
    parserTypeDraw: state.settings.parserTypeDraw,
    parserTypeModalOpen: state.settings.parserTypeModalOpen,

    editParserType: state.settings.editParserType,

    simulationModalOpen: state.settings.simulationModalOpen,

    matchResult: state.parserType.matchResult,
    parseResult: state.parserType.parseResult,

    filterModalOpen: state.parserType.filterModalOpen,
    editFilter: state.parserType.editFilter,

    patternModalOpen: state.parserType.patternModalOpen,
    editPattern: state.parserType.editPattern
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
      closeParserPatternModal,

      openSimulationModal,
      closeSimulationModal,
      matchFilter,
      parseFilter,

      showFilterEditModal,
      showPatternEditModal,
      updateSimParserType
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
