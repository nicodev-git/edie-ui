import React from 'react'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'

import {
  Modal,
  CardPanel
} from 'components/modal/parts'
import BrainCellModal from './BrainCellModal'
// import InlineEdit from 'components/common/ReactEditInline'

// const inlineStyle = {
//   width: '100%',
//   display: 'block'
// }

export default class BraincellGrokPickerModal extends React.Component {
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

  ///////////////////////////////////////////////////////////////////////////

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

  ///////////////////////////////////////////////////////////////////////////

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

  onLineChange () {

  }

  ///////////////////////////////////////////////////////////////////////////

  renderCellModal () {
    if (!this.state.cellModalOpen) return null
    return (
      <BrainCellModal
        noModal
        type="Grok"
        allTags={[]}
        onSave={this.onSaveBraincell.bind(this)}
        onClose={this.onCloseBraincellModal.bind(this)}

        vendorProducts={this.props.vendorProducts}
        productTypes={this.props.productTypes}
        productVendors={this.props.productVendors}

        updateProductType={this.props.updateProductType}

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
      <Modal title="Grok" onRequestClose={onClose}>
        <CardPanel title="Grok" tools={<AddIcon className="link" onClick={this.onClickAdd.bind(this)}/>}>
          <div style={{maxHeight: 400, overflow: 'auto'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="none">Name</TableCell>
                  <TableCell padding="none">Description</TableCell>
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
                    <TableCell padding="none"  component="th" scope="row">
                      {t.name}
                    </TableCell>
                    <TableCell padding="none">{t.description}</TableCell>
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
