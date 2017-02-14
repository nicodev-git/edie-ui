import React from 'react'
import Griddle from 'griddle-react'
import { withRouter } from 'react-router'
import { ROOT_URL } from '../../../../../actions/config'

@withRouter
class Devices extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [{
        'displayName': 'Name',
        'columnName': 'name'
      }, {
        'displayName': 'OS',
        'columnName': 'devicetype'
      }, {
        'displayName': 'Hardware',
        'columnName': 'cpuinfo',
        'customComponent': (props) => {
          let val = props.data
          let row = props.rowData
          let title = ''
          if (row.totalmemory) {
            title = `${Math.floor(Math.round(row.totalmemory / 1024))}GB`
          }

          return <div>{(val || '')}<br/>{title}</div>

          return this.progressbarFormatter(val)
        }
      }, {
        'displayName': 'IP',
        'columnName': 'ipaddress'
      }, {
        'displayName': 'CPU',
        'columnName': 'cpuusage',
        'customComponent': (props) => {
          let val = props.data
          return this.progressbarFormatter(parseInt(val || 0))
        }
      }, {
        'displayName': 'Memory',
        'columnName': 'usedmemory',
        'customComponent': (props) => {
          let row = props.rowData
          let p = 0
          let title
          if (row.totalmemory && row.usedmemory) {
            p = parseInt(100 * row.usedmemory / row.totalmemory)
            title = `${(row.usedmemory / 1024.0).toFixed(2)} GB` + `/${
                            (row.totalmemory / 1024.0).toFixed(2)} GB`
          }
          return this.progressbarFormatter(p, title)
        }

      }, /* {
          "displayName": "Disk",
          "columnName": "disks",
          "customComponent": (props) => {
              return (<div>
                  {this.progressbarFormatter(parseInt(Math.random() * 1000) % 100 + 1)}
                  {this.progressbarFormatter(parseInt(Math.random() * 1000) % 100 + 1)}
                  {this.progressbarFormatter(parseInt(Math.random() * 1000) % 100 + 1)}
              </div>)
          }

      }, */{
        'displayName': 'Health',
        'columnName': 'devicestatus',
        'cssClassName': 'text-center',
        'customComponent': (props) => {
          return this.healthFormatter(props.data)
        }

      }],

      data: [],
      selected: ''
    }
  }

  componentWillMount () {
    this.loadTable()
  }

  loadTable () {
    const {state} = this.props.location

    $.get(`${ROOT_URL}${Api.dashboard.getMonitorsByMapAndDeviceDT}`, {
      fatherid: state.device.id,
      mapid: state.device.mapid,
      rows: 0,
      draw: 1,
      start: 0,
      length: 100
    }).done(res => {
      this.setState({
        data: res.data
      })
    })
  }

  progressbarFormatter (val, title) {
    let color = 'red'
    let textcolor = 'black'
    if (val < 70) {
      color = 'green'
      if (val > 40) textcolor = 'white'
    } else if (val < 90) {
      color = '#fec835'
    }

    return (
      <div className="progress" style={{height: '12px', position: 'relative'}} title={title || ''}>
        <div className="progress-label"
          style={{fontSize: '9px', top: '1px', textAlign: 'center', position: 'absolute', width: '100%', color: textcolor}}>{val}%</div>
        <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"
          style={{width: `${val}%`, backgroundColor: color}} />
      </div>
    )
  }

  healthFormatter (val) {
    let cls = 'fa-question'
    let color = '#FDB422'
    if (val === 'UP') {
      cls = 'fa-check-square'
      color = 'green'
    } else if (val === 'DOWN') {
      cls = 'fa-times'
      color = 'red'
    }
    return (
            <div style={{width: '100%', textAlign: 'center'}}>
                <i className={`fa ${cls}`} style={{color: color, fontSize: '20px', verticalAlign: 'middle'}} />
            </div>
    )
  }

  lastSeenDateFormatter (date, display) {
    if (!date) return ''

    let diff = (new Date() - new Date(date)) / 1000
    diff = diff.toFixed(0)
    if (diff < 1) diff = 1
    let label = ''

    if (diff < 60) {
      label = `${diff + (diff > 1 ? ' seconds' : ' second')} ago`
    } else if (diff < 3600) {
      diff = parseInt(diff / 60)
      if (diff === 1) { label = `${diff} minute ago` } else {
        label = `${diff} minutes ago`
      }
    } else {
      diff = parseInt(diff / 3600)
      if (diff === 1) {
        label = `${diff} hour ago`
      } else {
        label = `${diff} hours ago`
      }
    }

    return label
  }

  render () {
    return (
      <div>
        <div className="tab-header" style={{minHeight: '40px'}}>
          <div>
            <span className="tab-title">{this.props.device.name || ''}</span>
          </div>
        </div>

        <Griddle
          results={this.state.data}
          tableClassName="table tab-table"
          showFilter={false}
          showSettings={false}
          columns={this.state.columns.map(item => item.columnName)}
          columnMetadata={this.state.columns}
          rowMetadata={{key: 'id'}}
          useGriddleStyles={false}
          resultsPerPage={100}
          bodyHeight={500}
        />
      </div>
    )
  }
}
Devices.defaultProps = {
  device: {}
}
