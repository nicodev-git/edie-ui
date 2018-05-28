import React from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import {Button, Chip} from '@material-ui/core'
import {chipStyles} from 'style/common/materialStyles'
import { concat, assign } from 'lodash'

import { FormInput, Modal, CardPanel } from 'components/modal/parts'
import FilterModal from './FilterModal'
import PatternModal from './PatternModal'

import {renderEntity} from 'components/common/CellRenderers'

class SimulationModal extends React.Component {
  onHide () {

  }
  onClickClose () {
    this.props.closeSimulationModal()
  }
  handleFormSubmit (props) {

  }
  onClickMatch () {
    const {currentText} = this.props
    const {filterChips} = this.props.editParserType
    this.props.matchFilter(currentText || '', filterChips.join('|'))
  }
  onClickParse () {
    const {currentText} = this.props
    const {patterns} = this.props.editParserType
    this.props.parseFilter(currentText || '', {patterns})
  }

  onClickAddFilter () {
    this.props.showFilterEditModal(true, -1)
  }

  onClickEditFilter (index) {
    this.props.showFilterEditModal(true, index)
  }

  onClickDeleteFilter (index) {
    const {editParserType} = this.props
    this.props.updateSimParserType(assign({}, editParserType, {
      filterChips: editParserType.filterChips.filter((f, i) => i !== index)
    }))
  }

  onSaveFilter (filter) {
    const {editParserType, editFilter} = this.props
    if (editFilter < 0) {
      this.props.updateSimParserType(assign({}, editParserType, {
        filterChips: concat(editParserType.filterChips, filter)
      }))
    } else {
      this.props.updateSimParserType(assign({}, editParserType, {
        filterChips: editParserType.filterChips.map((f, i) => i === editFilter ? filter : f)
      }))
    }

    this.onCloseFilterModal()
  }

  onCloseFilterModal () {
    this.props.showFilterEditModal(false)
  }

  onClickAddPattern () {
    this.props.showPatternEditModal(true, -1)
  }

  onClickEditPattern (index) {
    this.props.showPatternEditModal(true, index)
  }

  onClickDeletePattern (index) {
    const {editParserType} = this.props
    this.props.updateSimParserType(assign({}, editParserType, {
      patterns: editParserType.patterns.filter((f, i) => i !== index)
    }))
  }

  onSavePattern (pattern) {
    const {editParserType, editPattern} = this.props
    if (editPattern < 0) {
      this.props.updateSimParserType(assign({}, editParserType, {
        patterns: concat(editParserType.patterns, pattern)
      }))
    } else {
      this.props.updateSimParserType(assign({}, editParserType, {
        patterns: editParserType.patterns.map((f, i) => i === editPattern ? pattern : f)
      }))
    }

    this.onClosePatternModal()
  }

  onClosePatternModal () {
    this.props.showPatternEditModal(false)
  }

  renderButtons () {
    return (
      <div className="text-right">
        <Button variant="flat" color="primary" onClick={this.onClickMatch.bind(this)}>Match Filter</Button>
        <Button variant="flat" color="primary" onClick={this.onClickParse.bind(this)}>Parse</Button>

        <Button variant="flat" color="primary" onClick={this.onClickClose.bind(this)}>Cancel</Button>
      </div>
    )
  }

  renderFilterModal () {
    if (!this.props.filterModalOpen) return
    return (
      <FilterModal
        onSave={this.onSaveFilter.bind(this)}
        onClose={this.onCloseFilterModal.bind(this)}/>
    )
  }

  renderPatternModal () {
    if (!this.props.patternModalOpen) return
    return (
      <PatternModal
        onSave={this.onSavePattern.bind(this)}
        onClose={this.onClosePatternModal.bind(this)}/>
    )
  }

  renderChipContent (k) {
    const content = k.replace(/(^\.\*)|(\.\*$)/gi, '<span class="chip-small">.*</span>')
    return (
      <span dangerouslySetInnerHTML={{__html: content}}/> //eslint-disable-line
    )
  }

  render () {
    const {handleSubmit} = this.props
    return (
      <Modal title="Simulation" onRequestClose={this.onClickClose.bind(this)}>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <CardPanel title="Simulation">
          <div className="form-column">
            <Field name="text" component={FormInput} type="text" label="Text"/>
          </div>

          <div className="row m-none">
            <div className="margin-sm-top pull-left"><b>Filters</b></div>
            <div className="pull-right">
              <Button variant="flat" color="primary" onClick={this.onClickAddFilter.bind(this)}>Add</Button>
            </div>
          </div>

          <div className="margin-md-bottom" style={chipStyles.wrapper}>
            {this.props.editParserType.filterChips.map((k, i) =>
              <Chip
                key={i}
                style={chipStyles.chip}
                onClick={this.onClickEditFilter.bind(this, i)}
                onDelete={this.onClickDeleteFilter.bind(this, i)}
                label={this.renderChipContent(k)}
              />
            )}
          </div>

          <div className="row m-none">
            <div className="margin-sm-top pull-left"><b>Patterns</b></div>
            <div className="pull-right">
              <Button variant="flat" color="primary" onClick={this.onClickAddPattern.bind(this)}>Add</Button>
            </div>
          </div>
          <div style={chipStyles.wrapper} className="margin-md-bottom" >
            {this.props.editParserType.patterns.map((k, i) =>
              <Chip
                key={i}
                style={chipStyles.chip}
                onClick={this.onClickEditPattern.bind(this, i)}
                onDelete={this.onClickDeletePattern.bind(this, i)}
                label={k}
              />
            )}
          </div>

          <div className="row m-none">
            <div className="margin-sm-top pull-left"><b>Result</b></div>
          </div>
          <div className="margin-sm-top">Match Result: {this.props.matchResult}</div>
          <div><div className="inline-block">Parse Result:&nbsp;&nbsp;</div>{renderEntity(this.props.parseResult)}</div>
          </CardPanel>
          {this.renderButtons()}
        </form>
        {this.renderFilterModal()}
        {this.renderPatternModal()}
      </Modal>
    )
  }
}

const selector = formValueSelector('simulationForm')
export default connect(
  state => ({
    initialValues: state.settings.editParserType,
    currentText: selector(state, 'text')
  })
)(reduxForm({form: 'simulationForm'})(SimulationModal))
