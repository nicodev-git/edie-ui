import React, { Component } from 'react'
import moment from 'moment'
import { SmallModalTable } from '../../../../modal'

export default class MonitorHistoryModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }

    this.cells = [{
      'displayName': 'Date/Time',
      'columnName': 'timestamp',
      'cssClassName': 'width-140',
      'customComponent': (props) => {
        return <span>{moment(props.data).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    }, {
      'displayName': 'Status',
      'columnName': 'lastResult.status',
      'cssClassName': 'width-80 text-center',
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
      'columnName': 'lastResult.resultdata',
      'customComponent': props => {
        return <span>{JSON.stringify(props.rowData.lastResult)}</span>
      }
    }]
  }

  onClickClose () {
    this.props.onClose && this.props.onClose(this)
  }

  render () {
    const params = {
      monitorid: this.props.device.id,
      sort: 'timestamp,desc'
    }
    return (
      <SmallModalTable
        show
        onHide={this.onClickClose.bind(this)}
        customWidth="modal-750"
        params={params}
        cells={this.cells}
        header="Monitor history"
        url="/event/search/findBy"
        row={{'key': 'id'}}
        height={520}
        useExternal
      />
    )
  }
}

MonitorHistoryModal.defaultProps = {
  onClose: null,
  device: {}
}
