import React from 'react'
import Modal from 'react-bootstrap-modal'

export default class TagPickerModalView extends React.Component {
  render () {
    const {tags, onClickClose, onClickOK, onSelectTag} = this.props
    return (
      <Modal show onHide={() => {}} aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">
        <Header name="Workflow" />
        <div className="modal-body bootstrap-dialog-message">
          <div style={{maxHeight: '400px', overflow: 'auto'}}>
            <table className="table table-hover">
              <tbody>
              {
                tags.map((w, i) =>
                  <tr key={i} onClick={() => onSelectTag(i)}>
                    <td>{w}</td>
                  </tr>
                )
              }
              </tbody>
            </table>
          </div>
          <TwoButtonsBlockCustom name1="Cancel" action1={onClickClose} name2="OK" action2={onClickOK}/>
        </div>
      </Modal>
    )
  }
}
