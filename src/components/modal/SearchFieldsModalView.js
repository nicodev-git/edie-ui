import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Checkbox } from 'material-ui'

import { Header, TwoButtonsBlockCustom } from './parts'

class SearchFieldsModalView extends React.Component {
  render () {
    const {onClickOK, onClickClose, fields, selectedSearchFields, onCheck} = this.props
    return (
      <Modal
        show
        onHide={() => {}}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary modal-w-9"
      >
        <Header name="Fields" />
        <div className="modal-body bootstrap-dialog-message">
          <div className="row" style={{maxHeight: '500px', overflow: 'auto'}}>
            {fields.map(p =>
              <div key={p.path} className="col-md-4">
                <Checkbox
                  label={p.path.replace(/\.dataobj\./gi, '.').replace(/dataobj\./gi, '')}
                  checked={selectedSearchFields.indexOf(p.path) >= 0}
                  onCheck={(e, checked) => onCheck(checked, p.path)}/>
              </div>
            )}
          </div>
          <TwoButtonsBlockCustom name1="OK" name2="Cancel" action1={onClickOK} action2={onClickClose}/>
        </div>
      </Modal>
    )
  }
}

export default SearchFieldsModalView
