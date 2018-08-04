import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {find} from 'lodash'

import VendorProductModalView from './VendorProductModalView'
import BraincellTagPickerModal from 'components/sidebar/settings/braincell/BraincellTagPickerModal'
import BraincellClassPickerModal from 'components/sidebar/settings/braincell/BraincellClassPickerModal'

class VendorProductModal extends React.Component {
  constructor(props) {
    super(props)

    const {editProduct} = this.props
    this.state = {
      tags: (editProduct ? editProduct.tags : []) || [],
      tagModalOpen: false,

      classifiers: (editProduct ? editProduct.classifiers : []) || [],
      classModalOpen: false,

      parsers: [],
      parserModalOpen: false
    }
  }

  handleFormSubmit (values) {
    const {tags, classifiers} = this.state
    this.props.onSave({
      ...values,
      tags,classifiers
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
      >
        {this.renderTagPickerModal()}
        {this.renderClassPickerModal()}
      </VendorProductModalView>
    )
  }
}
export default connect(
  (state, props) => ({
    initialValues: props.editProduct
  })
)(reduxForm({form: 'vendorProductForm'})(VendorProductModal))
