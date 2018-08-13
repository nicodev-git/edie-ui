import React from 'react'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
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
          <div style={{maxHeight: 600, overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Key</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cells.map((t, i) =>
                  <tr key={t.id} className={i === selIndex ? 'selected' : ''}
                    onClick={() => this.onClickRow(i)}>
                    <td>{t.name}</td>
                    <td>{t.key}</td>
                    <td><EditIcon className="link" onClick={(e) => this.onClickEdit(t, e)}/></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardPanel>

        {this.renderCellModal()}
      </Modal>
    )

  }
}