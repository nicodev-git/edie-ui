import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {find} from 'lodash'
import uuid from 'uuid'

import VendorProductModalView from './VendorProductModalView'
import BraincellTagPickerModal from 'components/sidebar/settings/braincell/BraincellTagPickerModal'
import BraincellClassPickerModal from 'components/sidebar/settings/braincell/BraincellClassPickerModal'
import BraincellGrokPickerModal from 'components/sidebar/settings/braincell/BraincellGrokPickerModal'
import BraincellIncidentPickerModal from 'components/sidebar/settings/braincell/BraincellIncidentPickerModal'
import WorkflowPickerModal from 'components/sidebar/wf/WorkflowPickerModal'
import WorkflowEditModalContainer from 'containers/wf/WorkflowEditModalContainer'
import BrainCellModal from 'components/sidebar/settings/braincell/BrainCellModal'
import ActionRegexModal from './ActionRegexModal'

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
      newWfModalOpen: false,

      incidents: (editProduct ? editProduct.incidents : []) || [],
      incidentModalOpen: false,

      actionModalOpen: false,
      actions: [],

      loading: false
    }
  }

  handleFormSubmit (values) {
    const {tags, classifiers, parsers, workflows, incidents} = this.state
    this.props.onSave({
      ...values,
      tags,classifiers, parsers, workflows, incidents
    })
  }

  //////////////////////////////////////////////////////////////
  getAllTags (isEntity) {
    const items = this.props.brainCells.filter(p => p.type === 'Tag')
    if (isEntity) return items;
    return items.map(p => p.name)
  }

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

  onClickNewTag () {
    this.setState({
      brainCellType: 'Tag'
    }, () => {
      this.props.showBrainCellModal(true)
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
      const cell = find(brainCells, {id, type: 'ProductClassification'})
      if (cell) cells.push(cell)
    })
    return cells
  }

  onClickNewClass () {
    this.setState({
      brainCellType: 'ProductClassification'
    }, () => {
      this.props.showBrainCellModal(true)
    })
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

  onClickNewGrok () {
    this.setState({
      brainCellType: 'Grok'
    }, () => {
      this.props.showBrainCellModal(true)
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

  onClickAddNewWf () {
    this.setState({
      newWfModalOpen: true
    })
  }

  onSaveWf (values) {
    const {editWf} = this.state
    if (editWf) {
      this.props.updateWorkflow({
        ...editWf,
        ...values
      })
    } else {
      const flow = {
        ...values,
        uuid: uuid.v4()
      }
      this.setState({
        loading: true
      })
      this.props.addWorkflow(flow, entity => {
        this.setState({
          loading: false
        })
        if (!entity) return
        this.onPickWf(entity)
      })
    }
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
      const cell = find(brainCells, {id, type: 'Incident'})
      if (cell) cells.push(cell)
    })
    return cells
  }

  onClickAddIncident () {
    this.setState({
      incidentModalOpen: true
    })
  }

  onClickDeleteIncident (id) {
    if (!window.confirm('Click OK to remove')) return
    const {incidents} = this.state
    this.setState({
      incidents: incidents.filter(p => p !== id)
    })
  }

  onClickNewIncident () {
    this.setState({
      brainCellType: 'Incident'
    }, () => {
      this.props.showBrainCellModal(true)
    })
  }

  //////////////////////////////////////////////////////////////

  onSaveBraincell (entity) {
    if (entity.id) {
      this.props.updateBrainCell(entity)
    } else {
      this.setState({
        loading: true
      })
      this.props.addBrainCell(entity, (cell) => {
        this.setState({
          loading: false
        })

        const {brainCellType} = this.state
        if (brainCellType === 'Tag') this.onPickTag(cell.name)
        else if (brainCellType === 'ProductClassification') this.onPickClass(cell)
        else if (brainCellType === 'Grok') this.onPickGrok(cell)
        else if (brainCellType === 'Incident') this.onPickIncident(cell)
      })
    }
  }

  onCloseBraincellModal () {
    this.props.showBrainCellModal(false)
  }

  //////////////////////////////////////////////////////////////

  getProductTypeActions () {
    const {editProduct, productVendors, productTypes} = this.props
    if (!editProduct || !editProduct.id) return []

    const vendor = productVendors.filter(p => (p.productIds || []).includes(editProduct.id))[0]
    if (!vendor) return []
    const type = productTypes.filter(p => (p.vendorIds || []).includes(vendor.id))[0]

    if (!type) return []
    return type.actions || []
  }


  onClickAddAction () {
    this.setState({
      actionModalOpen: true
    })
  }

  onCloseAddAction () {
    this.setState({
      actionModalOpen: false
    })
  }

  onSaveAction () {

  }

  //////////////////////////////////////////////////////////////

  renderActionModal () {
    if (!this.state.actionModalOpen) return null
    return (
      <ActionRegexModal
        actions={this.getProductTypeActions()}
        onSave={this.onSaveAction.bind(this)}
        onClose={this.onCloseAddAction.bind(this)}
      />
    )
  }

  renderTagPickerModal () {
    if (!this.state.tagModalOpen) return null
    return (
      <BraincellTagPickerModal
        tags={this.getAllTags()}
        onPick={this.onPickTag.bind(this)}
        onClose={this.onClosePickTag.bind(this)}
      />
    )
  }

  renderClassPickerModal () {
    if (!this.state.classModalOpen) return null
    const {brainCells} = this.props
    const cells = brainCells.filter(p => p.type === 'ProductClassification')
    return (
      <BraincellClassPickerModal
        cells={cells}
        onPick={this.onPickClass.bind(this)}
        onClose={this.onClosePickClass.bind(this)}

        allTags={this.getAllTags(true)}

        productTypes={this.props.productTypes}
        productVendors={this.props.productVendors}
        vendorProducts={this.props.vendorProducts}

        addBrainCell={this.props.addBrainCell}
        updateBrainCell={this.props.updateBrainCell}
        removeBrainCell={this.props.removeBrainCell}

        brainCells={this.props.brainCells}
        editBrainCell={this.props.editBrainCell}

        showScriptModal={this.props.showScriptModal}
        showGrokModal={this.props.showGrokModal}
        showCellParamModal={this.props.showCellParamModal}
        scriptModalOpen={this.props.scriptModalOpen}
        grokModalOpen={this.props.grokModalOpen}
        editCellParam={this.props.editCellParam}
        cellParamModalOpen={this.props.cellParamModalOpen}
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

        allTags={[]}

        productTypes={this.props.productTypes}
        productVendors={this.props.productVendors}
        vendorProducts={this.props.vendorProducts}

        addBrainCell={this.props.addBrainCell}
        updateBrainCell={this.props.updateBrainCell}
        removeBrainCell={this.props.removeBrainCell}

        brainCells={this.props.brainCells}
        editBrainCell={this.props.editBrainCell}

        showScriptModal={this.props.showScriptModal}
        showGrokModal={this.props.showGrokModal}
        showCellParamModal={this.props.showCellParamModal}
        scriptModalOpen={this.props.scriptModalOpen}
        grokModalOpen={this.props.grokModalOpen}
        editCellParam={this.props.editCellParam}
        cellParamModalOpen={this.props.cellParamModalOpen}
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
    const {brainCells} = this.props
    const cells = brainCells.filter(p => p.type === 'Incident')
    return (
      <BraincellIncidentPickerModal
        cells={cells}
        onPick={this.onPickIncident.bind(this)}
        onClose={this.onClosePickIncident.bind(this)}
      />
    )
  }

  renderWFModal () {
    if (!this.state.newWfModalOpen) return null
    return (
      <WorkflowEditModalContainer
        newView
        allTags={this.getAllTags()}
        onSave={this.onSaveWf.bind(this)}
        onClose={() => this.setState({newWfModalOpen: false})}
      />
    )
  }

  renderBraincellModal () {
    if (!this.props.brainCellModalOpen) return null
    return (
      <BrainCellModal
        type={this.state.brainCellType}
        allTags={this.getAllTags(true)}
        onSave={this.onSaveBraincell.bind(this)}
        onClose={this.onCloseBraincellModal.bind(this)}

        productTypes={this.props.productTypes}
        productVendors={this.props.productVendors}
        vendorProducts={this.props.vendorProducts}

        brainCells={this.props.brainCells}
        editBrainCell={this.props.editBrainCell}

        showScriptModal={this.props.showScriptModal}
        showGrokModal={this.props.showGrokModal}
        showCellParamModal={this.props.showCellParamModal}
        scriptModalOpen={this.props.scriptModalOpen}
        grokModalOpen={this.props.grokModalOpen}
        editCellParam={this.props.editCellParam}
        cellParamModalOpen={this.props.cellParamModalOpen}
      />
    )
  }

  render () {
    const {handleSubmit, onClose, productTypes, productVendors} = this.props
    return (
      <VendorProductModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onHide={onClose}

        tags={this.state.tags}
        onClickAddTag={this.onClickAddTag.bind(this)}
        onClickDeleteTag={this.onClickDeleteTag.bind(this)}
        onClickNewTag={this.onClickNewTag.bind(this)}

        classifierCells={this.getClassifierCells()}
        onClickAddClass={this.onClickAddClass.bind(this)}
        onClickDeleteClass={this.onClickDeleteClass.bind(this)}
        onClickNewClass={this.onClickNewClass.bind(this)}

        grokCells={this.getGrokCells()}
        onClickAddGrok={this.onClickAddGrok.bind(this)}
        onClickDeleteGrok={this.onClickDeleteGrok.bind(this)}
        onClickNewGrok={this.onClickNewGrok.bind(this)}

        workflows={this.getPickedWorkflows()}
        onClickAddWf={this.onClickAddWf.bind(this)}
        onClickDeleteWf={this.onClickDeleteWf.bind(this)}
        onClickAddNewWf={this.onClickAddNewWf.bind(this)}

        incidentCells={this.getIncidentCells()}
        onClickAddIncident={this.onClickAddIncident.bind(this)}
        onClickDeleteIncident={this.onClickDeleteIncident.bind(this)}
        onClickNewIncident={this.onClickNewIncident.bind(this)}

        productTypes={productTypes}
        productVendors={productVendors}

        onClickAddAction={this.onClickAddAction.bind(this)}

        loading={this.state.loading}
      >
        {this.renderTagPickerModal()}
        {this.renderClassPickerModal()}
        {this.renderGrokPickerModal()}
        {this.renderWfPickerModal()}
        {this.renderIncidentPickerModal()}
        {this.renderWFModal()}
        {this.renderBraincellModal()}
        {this.renderActionModal()}
      </VendorProductModalView>
    )
  }
}
export default connect(
  (state, props) => ({
    initialValues: props.editProduct
  })
)(reduxForm({form: 'vendorProductForm'})(VendorProductModal))
