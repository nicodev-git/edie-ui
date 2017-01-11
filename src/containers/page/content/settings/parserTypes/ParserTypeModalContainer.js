import React from 'react'
import { connect } from 'react-redux'

import ParserTypeModal from 'components/page/content/settings/parserTypes/ParserTypeModal'
import {
  addParserType,
  updateParserType,
  closeParserTypeModal,

  openParserPatternModal,
  closeParserPatternModal
} from 'actions'

@connect(
  state => ({
    editParserType: state.settings.editParserType,

    editPattern: state.settings.editParserPattern,
    patternModalOpen: state.settings.parserPatternModalOpen,

    initialValues: state.settings.editParserType
  }), {
    addParserType,
    updateParserType,
    closeParserTypeModal,
    openParserPatternModal,
    closeParserPatternModal
  }
)
export default class ParserTypeModalContainer extends React.Component {
  render () {
    return (
      <ParserTypeModal {...this.props} />
    )
  }
}
