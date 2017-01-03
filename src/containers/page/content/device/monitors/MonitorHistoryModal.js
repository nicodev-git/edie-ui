import React from 'react'
import Modal from 'react-bootstrap-modal'
import moment from 'moment'

import InfiniteTable from '../../../../shared/InfiniteTable'

class MonitorHistoryModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,
      search: ''
    }

    this.cells = [{
      'displayName': 'Date/Time',
      'columnName': 'starttimestamp',
      'customComponent': (props) => {
        return <span>{moment(props.data).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    }, {
      'displayName': 'Status',
      'columnName': 'incidenttype',
      'cssClassName': 'width-140'
    }, {
      'displayName': 'Response',
      'columnName': 'description'
    }]
  }

  onHide () {
    this.onClickClose()
  }

  onClickClose () {
    this.props.onClose && this.props.onClose(this)
  }

    // ///////////////////////////////////

  onSearchKeyUp (e) {
    if (this.state.search === e.target.value) return

    this.setState({
      search: e.target.value
    })
  }

  render () {
    return (
      <Modal show={this.state.open} onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Monitor History
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">
          <div className="form-inline">
            <label>Search:</label>
            <input className="form-control input-sm" ref="search" onKeyUp={this.onSearchKeyUp.bind(this)}/>
          </div>
          <InfiniteTable
            url="/incidentstable/getIncidentsForMonitor?severity=High&severity=Medium"
            params={{
              id: this.props.device.id,
              searchValue: this.state.search
            }}
            cells={this.cells}
            ref="table"
            rowMetadata={{'key': 'id'}}
            bodyHeight={400}
          />
        </div>
      </Modal>
    )
  }
}

MonitorHistoryModal.defaultProps = {
  onClose: null,
  device: {}
}

export default MonitorHistoryModal
