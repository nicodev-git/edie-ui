import React, { Component } from 'react'
import moment from 'moment'
import { findIndex, assign } from 'lodash'
import TimeAgo from 'react-timeago'
import ReactTooltip from 'react-tooltip'
import { ResponsiveInfiniteTable } from '../../../../../shared/InfiniteTable'
import { showAlert, showConfirm } from '../../../../../shared/Alert'
import { getSeverityIcon } from '../../../../../../shared/Global'
const encodeUrlParams = getSeverityIcon
import { showIncidentDetail, showIncidentRaw } from '../../../../../shared/incident/Incident'
import MainIncidentsView from './MainIncidentsView'

export default class MainIncidents extends Component {
  constructor (props) {
    super(props)

    this.state = {

      severities: [
        { label: 'High', value: 'HIGH' },
        { label: 'Medium', value: 'MEDIUM' },
        { label: 'Low', value: 'LOW' },
        { label: 'Audit', value: 'AUDIT' },
        { label: 'Ignore', value: 'IGNORE' }
      ],

      selectedSeverity: ['HIGH', 'MEDIUM'],
      selectedIndex: -1,
      selectedItem: 1,
      currentSortCol: 'startTimestamp',
      currentSortDir: 'desc',
      openExceptionModal: false,
      commentModalVisible: false,
      params: {}
    }

    this.cells = [{
      'displayName': 'Severity',
      'columnName': 'severity',
      'cssClassName': 'text-center width-80',
      'customHeaderComponent': this.renderColHeader.bind(this),
      'customComponent': (props) => {
        return getSeverityIcon(props.data)
      }
    }, {
      'displayName': 'Date/Time',
      'columnName': 'startTimestamp',
      'cssClassName': 'nowrap text-center width-140',
      'customHeaderComponent': this.renderColHeader.bind(this),
      'customComponent': (props) => {
        const {data} = props
        if (!data) return <span/>
        return (
          <span data-tip={moment(new Date(data)).format('YYYY-MM-DD HH:mm:ss')}>
            <TimeAgo date={data}/>
          </span>
        )
      }
    }, {
      'displayName': 'Description',
      'columnName': 'description',
      'customComponent': (props) => {
        let str = props.data
        if (props.rowData.lastcomment) {
          str += `<br/><b>Reason:</b> ${props.rowData.lastcomment}`
        }

        return <span dangerouslySetInnerHTML={{ __html: str }} /> // eslint-disable-line react/no-danger
      }
    }, {
      'displayName': 'Actions',
      'columnName': 'actions',
      'cssClassName': 'nowrap width-200',
      'customComponent': (p) => {
        const row = p.rowData
        setTimeout(() => {
          ReactTooltip.rebuild()
        }, 1)
        return (
          <div>
            <a href="javascript:;" onClick={showIncidentDetail.bind(null, row)}>
              <img style={{height: '30px'}} title="Detail" src="/images/openicon.png" />
            </a>
            &nbsp;

            <a href="javascript:;" onClick={() => { props.ackIncident(row) }}>
              <img style={{height: '30px'}} title="Acknowledge"
                src={`/images/${row.acknowledged ? 'ack.png' : 'noack.png'}`} />
            </a>
            &nbsp;

            <a href="javascript:;" onClick={() => { props.fixIncident(row) }}>
              <img style={{height: '30px'}} title="Acknowledge"
                src={`/images/${row.fixed ? 'ok.png' : 'notok.png'}`} />
            </a>
            &nbsp;

            <button className="btn btn-primary btn-xs"
              onClick={showIncidentRaw.bind(null, row)}>Raw</button>
            &nbsp;

            {
              (row.fixed & !row.whathappened)
                ? <a href="javascript:;" onClick={this.showIncidentComments.bind(this, row)}>
                    <img style={{height: '25px'}} title="Reason"
                      src={`/images/${row.lastcomment ? 'reason-icon.png' : 'reason-x.png'}`} />
                  </a>
                : null
            }

          </div>
        )
      }
    }]
        // ///////////////////////////////////////

    this.onFilterChange = this.onFilterChange.bind(this)
  }

  componentDidMount () {
    this.onFilterChange()
  }

  renderColHeader (col) {
    const {columnName, displayName} = col
    const { currentSortCol, currentSortDir } = this.state
    let caretEl = null

    if (columnName === currentSortCol) {
      const cls = currentSortDir === 'asc' ? 'fa-caret-up' : 'fa-caret-down'
      caretEl = <i className={`margin-sm-left fa ${cls}`} />
    }

    return (
      <a href="javascript:;" className="text-black" onClick={this.onClickColHeader.bind(this, col)}>
        <span className="nowrap">{displayName}{caretEl}</span>
      </a>
    )
  }

  renderTable () {
    const params = assign({}, this.state.params, {
      draw: this.props.incidentDraw
    })

    return (
      <ResponsiveInfiniteTable
        cells={this.cells}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable
        onRowDblClick={this.onRowDblClick.bind(this)}

        url="/incident/search/findBy"
        params={params}
      />
    )
  }

  onClickColHeader (col) {
    const {
      columnName
    } = col
    let { currentSortCol, currentSortDir } = this.state

    if (columnName === currentSortCol) {
      currentSortDir = currentSortDir === 'asc' ? 'desc' : 'asc'
    } else {
      currentSortCol = columnName
      currentSortDir = 'asc'
    }
    this.setState({ currentSortCol, currentSortDir }, this.onFilterChange)
  }

  onClickOpen () {
    const selected = this.getTable().getSelected()
    if (selected) {
      showIncidentDetail(selected)
    } else {
      showAlert('Please select incident.')
    }
  }

  onRowDblClick (sel) {
    showIncidentDetail(sel)
  }

  onClickFixAll () {
    showConfirm('Click OK to fix all device incidents.', btn => {
      if (btn !== 'ok') return
      this.props.fixAllDeviceIncidents(this.props.device)
    })
  }

  onClickAddIncident () {
    this.props.openAddDeviceIncident()
  }

  onClickAddException () {
    const selected = this.getTable().getSelected()
    if (selected) {
      this.setState({
        selectedIndex: findIndex(this.props.incidents, {id: selected.id}),
        openExceptionModal: true
      })
    } else {
      showAlert('Please select incident.')
    }
  }

  onCloseExceptionModal (success) {
    this.setState({
      openExceptionModal: false
    })
  }

  onCloseCommentsModal () {
    this.setState({
      commentModalVisible: false
    })
  }

  onClickPDF () {
    const params = this.getParams()
    let url = `/pdfIncidents?${
             encodeUrlParams(params)}`
    window.open(url, '_blank')
  }

  onChangeSeverity (event, index, selected) {
    /* this.setState({
      selectedSeverity: selected.map(item => item.value)
    }, this.onFilterChange) */
    this.setState({
      selectedSeverity: selected,
      params: this.getParams()
    })
  }

  onFilterChange (event, index, value) {
    this.setState({
      params: this.getParams(),
      selectedItem: value
    })
  }

  getParams () {
    const refs = this.refs
    const {search, fixed, dp} = refs
    const { currentSortCol, currentSortDir, selectedSeverity } = this.state

    let params = {
      description: (search ? search.value : '') || '""',
      severity: selectedSeverity,
      afterStartTimestamp: dp ? dp.getStartDate().valueOf() : 1454256000000,
      beforeStartTimestamp: dp ? dp.getEndDate().valueOf() : (new Date()).getTime(),
      deviceid: this.props.device.id,
      sort: `${currentSortCol},${currentSortDir}`
    }
    if (fixed && fixed.value) params.fixed = fixed.value

    return params
  }

  showIncidentComments (incident) {
    this.setState({
      selectedIndex: findIndex(this.props.incidents, {id: incident.id}),
      commentModalVisible: true
    })
  }

  getTable () {
    return this.refs.table.refs.wrappedInstance
  }

  render () {
    let table = this.renderTable()
    return (
      <MainIncidentsView
        selectedSeverity={this.state.selectedSeverity}
        severities={this.state.severities}
        selectedIndex={this.state.selectedIndex}
        selectedItem={this.state.selectedItem}
        onChangeSeverity={this.onChangeSeverity.bind(this)}
        onFilterChange={this.onFilterChange}
        onClickOpen={this.onClickOpen.bind(this)}
        onClickFixAll={this.onClickFixAll.bind(this)}
        onClickAddIncident={this.onClickAddIncident.bind(this)}
        onClickAddException={this.onClickAddException.bind(this)}
        onClickPDF={this.onClickPDF.bind(this)}
        onCloseExceptionModal={this.onCloseExceptionModal.bind(this)}
        onCloseCommentsModal={this.onCloseCommentsModal.bind(this)}
        openExceptionModal={this.state.openExceptionModal}
        table={table}
        {...this.props}
      />
    )
  }
}
