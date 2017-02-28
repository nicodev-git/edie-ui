import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import moment from 'moment'

import InfiniteTable from '../../../../shared/InfiniteTable'

export default class MonitorHistoryModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,
      search: ''
    }

    this.cells = [{
      'displayName': 'Date/Time',
      'columnName': 'timestamp',
      'customComponent': (props) => {
        return <span>{moment(props.data).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    }, {
      'displayName': 'Status',
      'columnName': 'lastResult.status',
      'cssClassName': 'width-140',
      'customComponent': props => {
        const val = props.data
        let cls = 'fa-question'
        let color = '#FDB422'
        if (val === 'UP') {
          cls = 'fa-check-square'
          color = 'green'
        } else if (val === 'DOWN') {
          cls = 'fa-times'
          color = 'red'
        }
        return <i className={`fa ${cls}`} style={{color: color, fontSize: '20px', verticalAlign: 'middle'}} />
      }
    }, {
      'displayName': 'Response',
      'columnName': 'lastResult.resultdata'
    }]
  }

  onHide () {
    this.onClickClose()
  }

  onClickClose () {
    this.props.onClose && this.props.onClose(this)
  }

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
          <InfiniteTable
            url="/event/search/findBy"
            params={{
              monitorid: this.props.device.uid,
              sort: 'timestamp,desc'
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
