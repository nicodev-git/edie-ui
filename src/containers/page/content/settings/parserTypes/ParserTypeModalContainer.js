import React from 'react'
import { connect } from 'react-redux'

import ParserTypeModal from 'components/page/content/settings/parserTypes/ParserTypeModal'
import {
  addParserType,
  updateParserType,
  closeParserTypeModal
} from 'actions'

@connect(
  state => ({
    editParserType: state.settings.editParserType,
    initialValues: state.settings.editParserType
  }), {
    addParserType,
    updateParserType,
    closeParserTypeModal
  }
)
export default class ParserTypeModalContainer extends React.Component {
  render () {
    return (
      <ParserTypeModal {...this.props} />
    )
  }
}
