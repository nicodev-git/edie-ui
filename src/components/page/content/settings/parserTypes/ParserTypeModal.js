import React from 'react'
import { reduxForm } from 'redux-form'
import { assign, concat } from 'lodash'
import { connect } from 'react-redux'
import { showAlert } from 'components/shared/Alert'
import { ParserTypeModalView } from '../../../../modal'
import { validate } from '../../../../modal/validation/NameValidation'

class ParserTypeModal extends React.Component {
  constructor (props) {
    super(props)

    let patterns = ['']
    if (props.editParserType) patterns = concat([], props.editParserType.patterns || [], '')

    this.state = {
      patterns,
      selectedPatternIndex: -1
    }
  }

  onClickClose () {
    this.props.closeParserTypeModal()
  }

  handleFormSubmit (values) {
    const { editParserType } = this.props
    let props = assign({}, editParserType, values, {
      patterns: this.state.patterns.filter(p => !!p)
    })
    if (editParserType) {
      this.props.updateParserType(props)
    } else {
      this.props.addParserType(props)
    }
  }

  onClickRemovePattern () {
    const { patterns, selectedPatternIndex } = this.state
    if (selectedPatternIndex < 0) return showAlert('Please select pattern.')
    this.setState({ patterns: patterns.filter((m, index) => index !== selectedPatternIndex), selectedPatternIndex: -1 })
  }

  onPatternChange (index, data) {
    let { patterns } = this.state
    patterns = patterns.map((r, i) => i === index ? data.pattern : r)
    if (index === patterns.length - 1) patterns.push('')
    this.setState({ patterns })
  }

  onItemClick (index) {
    let patterns = this.state.patterns
    if (index !== patterns.length - 1) {
      this.setState({
        selectedPatternIndex: index
      })
    }
  }

  render () {
    const { patterns, selectedPatternIndex } = this.state
    const { handleSubmit } = this.props
    let header = 'Parser Type'
    return (
      <ParserTypeModalView
        show
        header={header}
        patterns={patterns}
        selectedIndex={selectedPatternIndex}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onPatternChange={this.onPatternChange.bind(this)}
        onDelete={this.onClickRemovePattern.bind(this)}
        onHide={this.onClickClose.bind(this)}
        onItemClick={this.onItemClick.bind(this)}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: state.settings.editParserType,
    validate: validate
  })
)(reduxForm({form: 'parserTypeForm'})(ParserTypeModal))
