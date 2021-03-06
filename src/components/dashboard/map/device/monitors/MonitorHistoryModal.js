import React, { Component } from 'react'
import moment from 'moment'
import CheckIcon from '@material-ui/icons/CheckBox'
import CloseIcon from '@material-ui/icons/Close'
import HelpIcon from '@material-ui/icons/Help'

import InfiniteTable from 'components/common/InfiniteTable'
import ShowMoreLine from 'components/common/ShowMoreLine'
import { CloseButton, Modal, CardPanel } from 'components/modal/parts'

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
        let cls = <HelpIcon nativeColor="#FDB422"/>
        if (val === 'UP') {
          cls = <CheckIcon nativeColor="green"/>
        } else if (val === 'DOWN') {
          cls = <CloseIcon nativeColor="red"/>
        }
        return cls
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
      <Modal title="Monitor History" onRequestClose={this.onClickClose.bind(this)}>
        <CardPanel title="Monitor History">
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
        </CardPanel>
        <CloseButton onClose={this.onClickClose.bind(this)} />
      </Modal>
    )
  }
}

MonitorHistoryModal.defaultProps = {
  onClose: null,
  device: {}
}
