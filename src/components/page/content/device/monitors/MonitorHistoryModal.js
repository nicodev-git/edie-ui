import React, { Component } from 'react'
import moment from 'moment'
import { SmallModalTable } from '../../../../modal'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default class MonitorHistoryModal extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      open: true,
      search: ''
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

  getChildContext () {
    return {
      muiTheme: getMuiTheme()
    }
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
    let header = 'Monitor history'
    let url = '/event/search/findBy'
    let params = {
      monitorid: this.props.device.uid,
      sort: 'timestamp,desc'
    }
    return (
      <SmallModalTable
        show={this.state.open}
        onHide={this.onClickClose.bind(this)}
        params={params}
        cells={this.cells}
        header={header}
        url={url}
        row={{'key': 'id'}}
        height={520}
      />
    )
  }
}

MonitorHistoryModal.defaultProps = {
  onClose: null,
  device: {}
}
