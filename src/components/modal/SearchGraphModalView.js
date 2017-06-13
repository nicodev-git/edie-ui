import React from 'react'
import Modal from 'react-bootstrap-modal'
import {FlatButton} from 'material-ui'
import {Line} from 'react-chartjs-2'

import {Header} from './parts'

export default class SearchGraphModalView extends React.Component {
  render () {
    const {onHide, chartData, chartOptions} = this.props
    return (
      <Modal show onHide={() => {}} aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary modal-w-9">
        <Header name="Graph"/>
        <div className="modal-body bootstrap-dialog-message">
          <div>
            <Line data={chartData} options={chartOptions} width="850" height="300" />
          </div>
          <div className="form-buttons">
            <FlatButton label="Close" onClick={onHide}/>
          </div>
        </div>
      </Modal>
    )
  }
}
