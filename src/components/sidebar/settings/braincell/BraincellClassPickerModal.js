import React from 'react'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import {find} from 'lodash'

import BrainCellModal from './BrainCellModal'

import {
  Modal,
  CardPanel
} from 'components/modal/parts'

export default class BraincellClassPickerModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selIndex: -1,
      cellModalOpen: false,
      editCell: null
    }
  }

  onClickRow (selIndex) {
    this.setState({selIndex})
    this.props.onPick(this.props.cells[selIndex])
  }

  onClickAdd () {
    this.setState({
      cellModalOpen: false
    }, () => {
      this.setState({
        cellModalOpen: true,
        editCell: null
      })
    })
  }

  onClickEdit (cell, e) {
    e.stopPropagation()
    this.setState({
      cellModalOpen: false
    }, () => {

      this.setState({
        cellModalOpen: true,
        editCell: cell
      })
    })
    return false
  }

  onClickDelete (cell, e) {
    e.stopPropagation()
    if (!window.confirm('Click OK to remove')) return
    this.props.removeBrainCell(cell)
    this.setState({
      cellModalOpen: false
    })
  }

  ///////////////////////////////////////////////////////////////////

  onSaveBraincell (entity) {
    if (entity.id) {
      this.props.updateBrainCell(entity)
    } else {
      this.props.addBrainCell(entity)
    }
    this.onCloseBraincellModal()
  }

  onCloseBraincellModal () {
    this.setState({
      cellModalOpen: false
    })
  }

  ///////////////////////////////////////////////////////////////////

  renderCellModal () {
    if (!this.state.cellModalOpen) return null
    return (
      <BrainCellModal
        title="Classification"
        noModal
        type="ProductClassification"
        allTags={this.props.allTags}
        onSave={this.onSaveBraincell.bind(this)}
        onClose={this.onCloseBraincellModal.bind(this)}

        vendorProducts={this.props.vendorProducts}
        productTypes={this.props.productTypes}
        productVendors={this.props.productVendors}

        brainCells={this.props.brainCells}
        editBrainCell={this.state.editCell}

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

  renderProductItem (productId) {
    const {vendorProducts, productTypes, productVendors} = this.props
    if (!productId) 
      return ''
    const product = find(vendorProducts, {id: productId});
    if (!product) 
      return '';    
    const vendor = productVendors.filter(p => (p.productIds || []).includes(product.id))[0]
    let label = ''
    if (vendor) {
      const type = productTypes.filter(p => (p.vendorIds || []).includes(vendor.id))[0]
      if (type) {
        label = ` (${type.name} / ${vendor.name})`
      }
    }
    return (
      <span>{product.name}{label}</span>
    )
  }

  render() {
    const {cells, onClose} = this.props
    const {selIndex} = this.state

    return (
      <Modal title="Classification" onRequestClose={onClose} contentStyle={{width: 1200}}>
        <CardPanel title="Classification" tools={<AddIcon className="link" onClick={this.onClickAdd.bind(this)}/>}>
          <div style={{maxHeight: 400, overflow: 'auto'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="none">Name</TableCell>
                  <TableCell padding="none">Product</TableCell>
                  <TableCell padding="none">Key</TableCell>
                  <TableCell padding="none">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cells.map((t, i) =>
                  <TableRow
                    key={t.id}
                    selected={i === selIndex}
                    onClick={() => this.onClickRow(i)}
                  >
                    <TableCell padding="none"  component="th" scope="row">{t.name}</TableCell>
                    <TableCell padding="none">{this.renderProductItem(t.productId)}</TableCell>
                    <TableCell padding="none">{t.key}</TableCell>
                    <TableCell padding="none">
                      <EditIcon className="link margin-md-right" onClick={(e) => this.onClickEdit(t, e)}/>
                      <DeleteIcon className="link margin-md-right" onClick={e => this.onClickDelete(t, e)}/>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardPanel>

        {this.renderCellModal()}
      </Modal>
    )

  }
}