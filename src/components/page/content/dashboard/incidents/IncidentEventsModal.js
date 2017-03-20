import React from 'react'
import Modal from 'react-bootstrap-modal'
import moment from 'moment'
import InfiniteTable from 'components/shared/InfiniteTable'

export default class IncidentEventsModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }

    this.cells = [{
      'displayName': 'Datetime',
      'columnName': 'timestamp',
      'cssClassName': 'width-200',
      'customComponent': props => {
        let data = moment(props.data).format('YYYY-MM-DD HH:mm:ss').toString()
        return <span>{data}</span>
      }
    }, {
      'displayName': 'Result',
      'columnName': 'lastResult.description',
      'customComponent': props => {
        const data = props.rowData.lastResult
        return <span>{data ? JSON.stringify(data) : ''}</span>
      }
    }]
  }

  renderTable () {
    return (
      <InfiniteTable
        cells={this.cells}
        ref="table"
        rowMetadata={{'key': 'id'}}

        url="/event/search/findBy"
        params={{
          deviceid: this.props.selectedIncident.deviceid,
          sort: 'timestamp,desc'
        }}
        bodyHeight={400}
        pageSize={20}
      />
    )
  }

  onHide () {

  }

  onClickClose () {
    this.props.closeIncidentEventsModal()
  }

  render () {
    return (
      <Modal show onHide={this.onHide.bind(this)} aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Incident Events
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">
          <div style={{maxHeight: '300px', overflow: 'auto'}}>
            {this.renderTable()}
          </div>
        </div>
      </Modal>
    )
  }
}
