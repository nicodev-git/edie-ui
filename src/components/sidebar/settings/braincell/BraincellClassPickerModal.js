import React from 'react'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'

import BrainCellModal from './BrainCellModal'

import {
  Modal,
  CardPanel
} from 'components/modal/parts'
import DeleteIcon from "../../../../../node_modules/@material-ui/icons/Delete";

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

  render() {
    const {cells, onClose} = this.props
    const {selIndex} = this.state

    return (
      <Modal title="Classification" onRequestClose={onClose}>
        <CardPanel title="Classification" tools={<AddIcon className="link" onClick={this.onClickAdd.bind(this)}/>}>
          <div style={{maxHeight: 400, overflow: 'auto'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Key</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cells.map((t, i) =>
                  <TableRow
                    key={t.id}
                    selected={i === selIndex}
                    onClick={() => this.onClickRow(i)}
                  >
                    <TableCell  component="th" scope="row">{t.name}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{t.key}</TableCell>
                    <TableCell><EditIcon className="link" onClick={(e) => this.onClickEdit(t, e)}/></TableCell>
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