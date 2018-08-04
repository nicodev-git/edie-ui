import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

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

      classifiers: [],
      classModalOpen: false
    }
  }

  handleFormSubmit (values) {
    this.props.onSave(values)
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

  onPickClass () {

  }

  onClosePickClass () {

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
    const cells = brainCells.filter(p => p.type === 'Classifier')
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

        //classifiers={}
      >
        {this.renderTagPickerModal()}
      </VendorProductModalView>
    )
  }
}
export default connect(
  (state, props) => ({
    initialValues: props.editProduct
  })
)(reduxForm({form: 'vendorProductForm'})(VendorProductModal))
