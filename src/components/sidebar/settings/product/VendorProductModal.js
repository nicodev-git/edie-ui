import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {find} from 'lodash'

import VendorProductModalView from './VendorProductModalView'
import BraincellTagPickerModal from 'components/sidebar/settings/braincell/BraincellTagPickerModal'
import BraincellClassPickerModal from 'components/sidebar/settings/braincell/BraincellClassPickerModal'
import BraincellGrokPickerModal from 'components/sidebar/settings/braincell/BraincellGrokPickerModal'
import WorkflowPickerModal from 'components/sidebar/wf/WorkflowPickerModal'

class VendorProductModal extends React.Component {
  constructor(props) {
    super(props)

    const {editProduct} = this.props
    this.state = {
      tags: (editProduct ? editProduct.tags : []) || [],
      tagModalOpen: false,

      classifiers: (editProduct ? editProduct.classifiers : []) || [],
      classModalOpen: false,

      parsers: (editProduct ? editProduct.parsers : []) || [],
      grokModalOpen: false,

      workflows: (editProduct ? editProduct.workflows : []) || [],
      wfModalOpen: false,

      incidents: (editProduct ? editProduct.incidents : []) || [],
      incidentModalOpen: false
    }
  }

  handleFormSubmit (values) {
    const {tags, classifiers, parsers, workflows} = this.state
    this.props.onSave({
      ...values,
      tags,classifiers, parsers, workflows
    })
  }

  //////////////////////////////////////////////////////////////

  onClickAddTag () {
    this.setState({
      tagModalOpen: true
    })
  }

  onPickTag (tag) {
    const {tags} = this.state
    if (tags.indexOf(tag) >= 0) return alert('Already exists')
    this.setState({
      tags: [...tags, tag]
    })
    this.onClosePickTag()
  }

  onClosePickTag () {
    this.setState({tagModalOpen: false})
  }

  onClickDeleteTag (index) {
    if (!window.confirm('Click OK to remove')) return
    const {tags} = this.state
    this.setState({
      tags: tags.filter((p, i) => i !== index)
    })
  }

  //////////////////////////////////////////////////////////////

  onClickAddClass () {
    this.setState({
      classModalOpen: true
    })
  }

  onPickClass (cell) {
    const {classifiers} = this.state
    if (classifiers.indexOf(cell.id) >= 0) return alert('Already exists')
    this.setState({
      classifiers: [...classifiers, cell.id]
    })
    this.onClosePickClass()
  }

  onClosePickClass () {
    this.setState({
      classModalOpen: false
    })
  }

  onClickDeleteClass (id) {
    if (!window.confirm('Click OK to remove')) return
    const {classifiers} = this.state
    this.setState({
      classifiers: classifiers.filter(p => p !== id)
    })
  }

  getClassifierCells () {
    const {brainCells} = this.props
    const {classifiers} = this.state
    const cells = []
    classifiers.forEach(id => {
      const cell = find(brainCells, {id, type: 'Classification'})
      if (cell) cells.push(cell)
    })
    return cells
  }

  //////////////////////////////////////////////////////////////

  onPickGrok (cell) {
    const {parsers} = this.state
    if (parsers.indexOf(cell.id) >= 0) return alert('Already exists')
    this.setState({
      parsers: [...parsers, cell.id]
    })
    this.onClosePickGrok()
  }

  onClosePickGrok () {
    this.setState({
      grokModalOpen: false
    })
  }

  getGrokCells () {
    const {brainCells} = this.props
    const {parsers} = this.state
    const cells = []
    parsers.forEach(id => {
      const cell = find(brainCells, {id, type: 'Grok'})
      if (cell) cells.push(cell)
    })
    return cells
  }

  onClickAddGrok () {
    this.setState({
      grokModalOpen: true
    })
  }

  onClickDeleteGrok (id) {
    if (!window.confirm('Click OK to remove')) return
    const {parsers} = this.state
    this.setState({
      parsers: parsers.filter(p => p !== id)
    })
  }

  //////////////////////////////////////////////////////////////

  onPickWf (cell) {
    const {workflows} = this.state
    if (workflows.indexOf(cell.id) >= 0) return alert('Already exists')
    this.setState({
      workflows: [...workflows, cell.id]
    })
    this.onClosePickWf()
  }

  onClosePickWf () {
    this.setState({
      wfModalOpen: false
    })
  }

  getPickedWorkflows () {
    const {workflows} = this.state
    const cells = []
    workflows.forEach(id => {
      const cell = find(this.props.workflows, {id})
      if (cell) cells.push(cell)
    })
    return cells
  }

  onClickAddWf () {
    this.setState({
      wfModalOpen: true
    })
  }

  onClickDeleteWf (id) {
    if (!window.confirm('Click OK to remove')) return
    const {workflows} = this.state
    this.setState({
      workflows: workflows.filter(p => p !== id)
    })
  }

  //////////////////////////////////////////////////////////////

  onPickIncident (cell) {
    const {incidents} = this.state
    if (incidents.indexOf(cell.id) >= 0) return alert('Already exists')
    this.setState({
      incidents: [...incidents, cell.id]
    })
    this.onClosePickIncident()
  }

  onClosePickIncident () {
    this.setState({
      incidentModalOpen: false
    })
  }

  getIncidentCells () {
    const {brainCells} = this.props
    const {incidents} = this.state
    const cells = []
    incidents.forEach(id => {
      const cell = find(brainCells, {id, type: 'Grok'})
      if (cell) cells.push(cell)
    })
    return cells
  }

  onClickAddIncident () {
    this.setState({
      grokModalOpen: true
    })
  }

  onClickDeleteIncident (id) {
    if (!window.confirm('Click OK to remove')) return
    const {parsers} = this.state
    this.setState({
      parsers: parsers.filter(p => p !== id)
    })
  }

  //////////////////////////////////////////////////////////////

  renderTagPickerModal () {
    if (!this.state.tagModalOpen) return null
    const {brainCells} = this.props
    const tags = brainCells.filter(p => p.type === 'Tag').map(p => p.name)
    return (
      <BraincellTagPickerModal
        tags={tags}
        onPick={this.onPickTag.bind(this)}
        onClose={this.onClosePickTag.bind(this)}
      />
    )
  }

  renderClassPickerModal () {
    if (!this.state.classModalOpen) return null
    const {brainCells} = this.props
    const cells = brainCells.filter(p => p.type === 'Classification')
    return (
      <BraincellClassPickerModal
        cells={cells}
        onPick={this.onPickClass.bind(this)}
        onClose={this.onClosePickClass.bind(this)}
      />
    )
  }

  renderGrokPickerModal () {
    if (!this.state.grokModalOpen) return
    const {brainCells} = this.props
    const cells = brainCells.filter(p => p.type === 'Grok')
    return (
      <BraincellGrokPickerModal
        cells={cells}
        onPick={this.onPickGrok.bind(this)}
        onClose={this.onClosePickGrok.bind(this)}
      />
    )
  }

  renderWfPickerModal () {
    if (!this.state.wfModalOpen) return null
    return (
      <WorkflowPickerModal
        workflows={this.props.workflows}
        onPick={this.onPickWf.bind(this)}
        onClose={this.onClosePickWf.bind(this)}
      />
    )
  }

  renderIncidentPickerModal () {
    if (!this.state.incidentModalOpen) return null
  }

  render () {
    const {handleSubmit, onClose} = this.props
    return (
      <VendorProductModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onHide={onClose}

        tags={this.state.tags}
        onClickAddTag={this.onClickAddTag.bind(this)}
        onClickDeleteTag={this.onClickDeleteTag.bind(this)}

        classifierCells={this.getClassifierCells()}
        onClickAddClass={this.onClickAddClass.bind(this)}
        onClickDeleteClass={this.onClickDeleteClass.bind(this)}

        grokCells={this.getGrokCells()}
        onClickAddGrok={this.onClickAddGrok.bind(this)}
        onClickDeleteGrok={this.onClickDeleteGrok.bind(this)}

        workflows={this.getPickedWorkflows()}
        onClickAddWf={this.onClickAddWf.bind(this)}
        onClickDeleteWf={this.onClickDeleteWf.bind(this)}
      >
        {this.renderTagPickerModal()}
        {this.renderClassPickerModal()}
        {this.renderGrokPickerModal()}
        {this.renderWfPickerModal()}
        {this.renderIncidentPickerModal()}
      </VendorProductModalView>
    )
  }
}
export default connect(
  (state, props) => ({
    initialValues: props.editProduct
  })
)(reduxForm({form: 'vendorProductForm'})(VendorProductModal))
