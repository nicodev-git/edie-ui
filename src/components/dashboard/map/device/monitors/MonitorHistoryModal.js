import React, { Component } from 'react'
import moment from 'moment'
import {Dialog} from 'material-ui'

import InfiniteTable from 'components/shared/InfiniteTable'
import ShowMoreLine from 'components/shared/ShowMoreLine'
import { Header, CloseButton } from 'components/modal/parts'

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
        const val = props.rowData.eventType === 'AGENT' ? 'UP' : props.data
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
        return <ShowMoreLine text={JSON.stringify(props.rowData.eventType === 'AGENT' ? props.rowData.dataobj : props.rowData.lastResult)}/>
      }
    }]
  }

  onClickClose () {
    this.props.onClose && this.props.onClose(this)
  }

  render () {
    const params = {
      monitorid: this.props.device.uid,
      sort: 'timestamp,desc'
    }

    return (
      <Dialog open title="Monitor History">
        <div className="small-modal-table">
          <div style={{height: '300px', position: 'relative'}}>
            <InfiniteTable
              id="table"
              url="/event/search/findBy"
              params={params}
              cells={this.cells}
              rowMetadata={{'key': 'id'}}
            />
          </div>
        </div>
        <CloseButton onClose={this.onClickClose.bind(this)} />
      </Dialog>
    )
  }
}

MonitorHistoryModal.defaultProps = {
  onClose: null,
  device: {}
}
