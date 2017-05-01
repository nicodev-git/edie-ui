import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

import { Header, TwoButtonsBlockCustom } from './parts'

class SearchFieldsModalView extends React.Component {
  render () {
    const {onClickOK, onClickClose, fields, onRowSelection} = this.props
    return (
      <Modal
        show
        onHide={() => {}}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name="Fields" />
        <div className="modal-body bootstrap-dialog-message">
          <Table height="300px" multiSelectable onRowSelection={onRowSelection}>
            <TableHeader enableSelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map(p =>
                <TableRow key={p.path}>
                  <TableRowColumn>{p.path}</TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TwoButtonsBlockCustom name1="OK" name2="Cancel" action1={onClickOK} action2={onClickClose}/>
        </div>
      </Modal>
    )
  }
}

export default SearchFieldsModalView
