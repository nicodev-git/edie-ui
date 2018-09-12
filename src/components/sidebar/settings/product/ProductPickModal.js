import React from 'react'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'

import {
  Modal,
  CardPanel
} from 'components/modal/parts'

export default class ProductPickModal extends React.Component {
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

  render() {
    const {products, onClose} = this.props
    const {selIndex} = this.state

    return (
      <Modal title="Product" onRequestClose={onClose}>
        <CardPanel title="Product">
          <div style={{maxHeight: 400, overflow: 'auto'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="none">Name</TableCell>
                  <TableCell padding="none">Description</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((t, i) =>
                  <TableRow
                    key={t.id}
                    selected={i === selIndex}
                    onClick={() => this.onClickRow(i)}
                  >
                    <TableCell padding="none"  component="th" scope="row">
                      {t.name}
                    </TableCell>
                    <TableCell padding="none">{t.description}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardPanel>
      </Modal>
    )
  }
}