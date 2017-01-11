import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
  Button
} from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'
import { assign, concat } from 'lodash'
import InlineEdit from 'react-edit-inline'

import { showAlert } from 'components/shared/Alert'

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

  onHide () {

  }

  onClickClose () {
    this.props.closeParserTypeModal()
  }

  handleFormSubmit (values) {
    const { editParserType } = this.props

    let props = assign({}, editParserType, values, {
      patterns: this.state.patterns.filter(p => !!p)
    })

    if (!props.name) return showAlert('Please type name.')

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

  render () {
    const { patterns, selectedPatternIndex } = this.state
    const { handleSubmit } = this.props

    return (
      <Modal show onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Parser Type
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">

          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <div className="row margin-md-bottom">
              <label className="col-md-3">Name</label>
              <div className="col-md-9">
                <Field name="name" component="input" type="text" label="Name" className="form-control"/>
              </div>
            </div>

            <div className="row margin-md-bottom">
              <label className="col-md-3">Filters</label>
              <div className="col-md-9">
                <Field name="filters" component="input" type="text" label="Filters" className="form-control"/>
              </div>
            </div>

            <div>
              <div>
                <span className="margin-sm-right">Patterns</span>
                <a href="javascript:;" className="margin-sm-right" onClick={this.onClickRemovePattern.bind(this)}><i className="fa fa-trash-o" /></a>
              </div>

              <div>
                <table className="table table-hover">
                  <tbody>
                  {
                    patterns.map((a, index) =>
                      <tr key={index} className={selectedPatternIndex === index ? 'selected' : ''} onClick={() => { if (index !== patterns.length - 1) this.setState({ selectedPatternIndex: index }) }}>
                        <td>
                          <InlineEdit
                            activeClassName="editing"
                            text={a || '\u00a0'}
                            paramName="pattern"
                            change={this.onPatternChange.bind(this, index)}
                            style={{
                              width: '100%',
                              display: 'block'
                            }}
                          />
                        </td>
                      </tr>
                    )
                  }
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-right">
              <Button className="btn-primary btn-sm" type="submit">Save</Button>
              <Button className="btn-sm margin-sm-left" onClick={this.onClickClose.bind(this)}>Cancel</Button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

export default reduxForm({form: 'parserTypeForm'})(ParserTypeModal)
