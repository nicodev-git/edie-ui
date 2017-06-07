import React from 'react'
import Modal from 'react-bootstrap-modal'
import {Header, TwoButtonsBlockCustom} from './parts'

import {Tabs, Tab} from 'material-ui/Tabs'

export default class ViewFilterModalView extends React.Component {
  render () {
    const {onClickOK, onClickClose} = this.props
    return (
      <Modal show onHide={() => {}} aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">
        <Header name="View Filter"/>
        <div className="modal-body bootstrap-dialog-message">
          <Tabs>
            <Tab label="Predefined">
              <div>
                Logs
              </div>
            </Tab>
            <Tab label="Specific"/>
          </Tabs>
          <TwoButtonsBlockCustom name1="OK" name2="Cancel" action1={onClickOK} action2={onClickClose}/>
        </div>
      </Modal>
    )
  }
}
