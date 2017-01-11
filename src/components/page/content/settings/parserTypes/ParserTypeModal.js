import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
  Button
} from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'
import { assign, concat } from 'lodash'
import { showAlert } from 'components/shared/Alert'

import ParserPatternModal from './ParserPatternModal'

class ParserTypeModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      patterns: [],
      selectedPatternIndex: -1
    }
  }

  onHide () {
    this.onClickClose()
  }

  onClickClose () {
    this.props.closeParserTypeModal()
  }

  handleFormSubmit (values) {
    const { editParserType } = this.props

    let props = assign({}, editParserType, values)

    if (!props.name) return showAlert('Please type name.')

    if (editParserType) {
      this.props.updateParserType(props)
    } else {
      this.props.addParserType(props)
    }
  }

  onClickAddPattern () {
    this.props.openParserPatternModal()
  }

  onClickEditPattern () {
    this.props.openParserPatternModal()
  }

  onClickRemovePattern () {

  }

  onPatternModalClose (data) {
    this.props.closeParserPatternModal()
    if (!data) return

    const { patterns } = this.state
    this.setState({ patterns: concat(patterns, data) })
  }

  renderPatternModal () {
    if (!this.props.patternModalOpen) return null
    return (
      <ParserPatternModal editPattern={this.props.editPattern} onClose={this.onPatternModalClose.bind(this)}/>
    )
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
                <a href="javascript:;" className="margin-sm-right" onClick={this.onClickAddPattern.bind(this)}><i className="fa fa-plus-square" /></a>
                <a href="javascript:;" className="margin-sm-right" onClick={this.onClickEditPattern.bind(this)}><i className="fa fa-edit" /></a>
                <a href="javascript:;" className="margin-sm-right" onClick={this.onClickRemovePattern.bind(this)}><i className="fa fa-trash-o" /></a>
              </div>

              <div>
                <table className="table table-hover">
                  <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    patterns.map((a, index) =>
                      <tr key={a} className={selectedPatternIndex === index ? 'selected' : ''} onClick={() => { this.setState({ selectedPatternIndex: index }) }}>
                        <td>{a}</td>
                      </tr>
                    )
                  }
                  </tbody>
                </table>

                {this.renderPatternModal()}
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
