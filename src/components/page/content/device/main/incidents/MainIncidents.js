import React, { Component } from 'react'
import moment from 'moment'
import {
  findIndex,
  assign
} from 'lodash'
import Select from 'react-select'
import {
    DropdownButton,
    ButtonGroup,
    MenuItem,
    Button
} from 'react-bootstrap'
import TimeAgo from 'react-timeago'
import ReactTooltip from 'react-tooltip'

import DateRangePicker from '../../../../../shared/DateRangePicker'
import { ResponsiveInfiniteTable } from '../../../../../shared/InfiniteTable'
import AddIncidentModal from './AddIncidentModal'
import AddExceptionModal from './AddExceptionModal'
import CommentsModal from '../../../../../shared/incident/CommentsModal'

import { showAlert, showConfirm } from '../../../../../shared/Alert'
import { getSeverityIcon } from '../../../../../../shared/Global'
const encodeUrlParams = getSeverityIcon
import MainTabs from '../MainTabs'
import TabPage from '../../../../../shared/TabPage'
import TabPageBody from '../../../../../shared/TabPageBody'
import TabPageHeader from '../../../../../shared/TabPageHeader'
import {
  showIncidentDetail,
  showIncidentRaw
} from '../../../../../shared/incident/Incident'

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

  onClickPDF () {
    const params = this.getParams()
    let url = `/pdfIncidents?${
             encodeUrlParams(params)}`
    window.open(url, '_blank')
  }

  onChangeSeverity (selected) {
    this.setState({
      selectedSeverity: selected.map(item => item.value)
    }, this.onFilterChange)
  }

  onFilterChange () {
    this.setState({
      params: this.getParams()
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
    const {device, incidents} = this.props
    const {selectedIndex} = this.state

    let selectedIncident = selectedIndex < 0 ? null : incidents[selectedIndex]

    return (
      <TabPage>
        <TabPageHeader title={device.name}>
          <div className="text-center margin-md-top">

            <div className="pull-left">
              <div className="form-inline">
                <Select
                  value={this.state.selectedSeverity.join(',')}
                  options={this.state.severities}
                  onChange={this.onChangeSeverity.bind(this)}
                  multi
                  clearable={false}
                  className="select-severity"
                  style={{minWidth: '85px'}}
                  searchable={false}
                  autosize={false}
                  backspaceRemoves={false}
                />

                <select className="fixtype form-control inline text-primary margin-md-left"
                  style={{maxWidth: '150px'}}
                  onChange={this.onFilterChange}
                  ref="fixed" defaultValue="false">
                  <option value="">Any</option>
                  <option value="false">Unfixed</option>
                  <option value="true">Fixed</option>
                </select>

                <DateRangePicker onClickRange={this.onFilterChange} className="margin-md-left"
                  default={moment().startOf('years').format('YYYY')} ref="dp">
                  <i className="fa fa-caret-down margin-xs-left" />
                </DateRangePicker>

                <a href="javascript:;" title="Export" style={{display: 'none'}}><img
                  width="26" src="/images/btn-export.jpg"/></a>
              </div>
            </div>

            <div className="pull-right">
              <ButtonGroup>

                <Button onClick={this.onClickOpen.bind(this)}>Open</Button>

                <Button onClick={this.onClickFixAll.bind(this)}>Fix All</Button>

                <DropdownButton title="More" id="dd-dev-incidents" pullRight>

                  <MenuItem eventKey="1" onClick={this.onClickAddIncident.bind(this)}>
                    Add Incident
                  </MenuItem>

                  <MenuItem eventKey="2" onClick={this.onClickAddException.bind(this)}>
                    Add Exception
                  </MenuItem>

                  <MenuItem eventKey="3" onClick={this.onClickPDF.bind(this)}>
                    Export PDF
                  </MenuItem>

                </DropdownButton>

              </ButtonGroup>
            </div>

            <div style={{margin: '0 auto', position: 'relative', display: 'inline-block', textAlign: 'center'}}>
              <div className="inline" style={{position: 'relative'}}>
                <input type="text" placeholder="Search" className="form-control"
                  style={{width: '100%', paddingLeft: '35px'}}
                  onChange={this.onFilterChange}
                  ref="search"/>
                <a className="btn" href="javascript:;" style={{position: 'absolute', left: 0, top: 0}}>
                  <i className="fa fa-search" /></a>
              </div>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={MainTabs(device.id)} tab={0}>
          {this.renderTable()}
          {this.props.addIncidentModalVisible &&
          <AddIncidentModal {...this.props} open device={this.props.device}/>}
          {this.state.openExceptionModal &&
          <AddExceptionModal open incident={selectedIncident}
            onClose={this.onCloseExceptionModal.bind(this)}/>}

          {this.state.commentModalVisible &&
          <CommentsModal incident={selectedIncident}
            onClose={() => { this.setState({commentModalVisible: false}) }}/>}

          <ReactTooltip />
        </TabPageBody>
      </TabPage>
    )
  }
}
