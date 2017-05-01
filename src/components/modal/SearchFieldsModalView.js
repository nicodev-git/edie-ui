import React from 'react'
import Modal from 'react-bootstrap-modal'

import { Header, TwoButtonsBlockCustom } from './parts'

class SearchFieldsModalView extends React.Component {
  render () {
    const {onClickOK, onClickClose, fields} = this.props
    return (
      <Modal
        show
        onHide={() => {}}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name="Fields" />
        <div className="modal-body bootstrap-dialog-message">
          <div style={{maxHeight: '350px', overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Origin</th>
              </tr>
              </thead>
              <tbody>
              {fields.map(p =>
                <tr key={p.path}>
                  <td>{p.path}</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
          <TwoButtonsBlockCustom name1="OK" name2="Cancel" action1={onClickOK} action2={onClickClose}/>
        </div>
      </Modal>
    )
  }
}

export default SearchFieldsModalView
