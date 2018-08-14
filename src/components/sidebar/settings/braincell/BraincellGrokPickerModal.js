import React from 'react'

import {
  Modal,
  CardPanel
} from 'components/modal/parts'
import BrainCellModal from "./BrainCellModal";

export default class BraincellGrokPickerModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selIndex: -1
    }
  }

  onClickRow (selIndex) {
    this.setState({selIndex})
    this.props.onPick(this.props.cells[selIndex])
  }

  onSaveBraincell () {

  }

  onCloseBraincellModal () {

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
        <CardPanel title="Grok">
          <div style={{maxHeight: 600, overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Name</th>
              </tr>
              </thead>
              <tbody>
              {cells.map((t, i) =>
                <tr key={t.id} className={i === selIndex ? 'selected' : ''}
                    onClick={() => this.onClickRow(i)}>
                  <td>{t.name}</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </CardPanel>
      </Modal>
    )

  }
}
