import React from 'react'
import moment from 'moment'
import {IconButton, TextField, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MessageIcon from '@material-ui/icons/Message'
import {Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core'
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet'
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme'
import ReactTooltip from 'react-tooltip'
import {debounce} from 'lodash'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import SettingTabs from '../SettingTabs'

import AuditDetailModal from './AuditDetailModal'
import {channelIcons as icons} from 'shared/Global'

const flexStyle = {
  overflow: 'auto',
  height: '100%'
}

const presets = [
  {text: 'Ever', start: moment('2000-01-01'), end: moment().endOf('year')},
  {text: moment().add('-1', 'years').format('YYYY'), start: moment().add('-1', 'years').startOf('year'), end: moment().add('-1', 'years').endOf('year')},
  {text: moment().startOf('years').format('YYYY'), start: moment().startOf('year'), end: moment().endOf('year')},
  {text: moment().add('-1', 'months').format('MMMM'), start: moment().add(-1, 'months').startOf('month'), end: moment().add(-1, 'months').endOf('month')},
  {text: moment().startOf('month').format('MMMM'), start: moment().startOf('month'), end: moment().endOf('month')},
  {text: 'Last 30 Days', start: moment().add(-30, 'days').startOf('day'), end: moment().endOf('day')},
  {text: 'Last 7 Days', start: moment().add(-6, 'days').startOf('day'), end: moment().endOf('day')},
  {text: 'Last 3 Months', start: moment().add(-3, 'months').startOf('day'), end: moment().endOf('day')},
  {text: 'Last 6 Months', start: moment().add(-6, 'months').startOf('day'), end: moment().endOf('day')},
  {text: 'Last 1 Year', start: moment().add(-12, 'months').startOf('day'), end: moment().endOf('day')},
  {text: 'Since Yesterday', start: moment().add(-1, 'days').startOf('day'), end: moment().endOf('day')},
  {text: 'Yesterday', start: moment().add(-1, 'days').startOf('day'), end: moment().add(-1, 'days').endOf('day')},
  {text: 'Today', start: moment().startOf('day'), end: moment().endOf('day')}
]

export default class Audit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: '',
      workflow: null,
      msgs: [],

      txtConnectorId: '',
      filterApp: 'connector',

      startDate: moment('2018-01-01'),
      endDate: moment().endOf('year'),

      page: 0,
      rowsPerPage: 15
    }

    this.auditColumns = [
      { id: 'time', label: 'Time', padding: 'none', style: {paddingLeft: 8, width: 150} },
      { id: 'channel', label: 'Channel', padding: 'none', style: {width: 55}},
      { id: 'app', label: 'App', padding: 'none', style: {width: 55} },
      { id: 'action', label: 'Action', padding: 'none' },
      { id: 'details', label: 'Details', padding: 'none' },
      { id: 'actions', label: 'Actions', padding: 'none' }
    ]

    this.buildTooltip = debounce(() => {
      ReactTooltip.rebuild()
    }, 500)
  }
  componentWillMount () {
    ThemedStyleSheet.registerTheme(DefaultTheme)

    this.fetchAudit(0)
  }
  onClickAuditRow (row) {
    let msgs = []
    if (row.userConnectorId) {
      msgs = this.props.audit.filter(p => p.userConnectorId === row.userConnectorId && p.message)
    }
    this.setState({
      msgs
    })
  }

  fetchAudit (page) {
    this.props.findAuditByDate({
      dateFrom: this.state.startDate.valueOf(),
      dateTo: this.state.endDate.valueOf(),
      userConnectorId: this.state.txtConnectorId,
      component: this.state.filterApp,
      page: page === null ? this.props.auditPage.page : page,
      size: this.props.auditPage.size
    })
  }

  ////////////////////////////////////

  onChangeConnectorId (e) {
    this.setState({
      txtConnectorId: e.target.value
    })
  }

  onClickSearch () {

  }

  handleChangePage (e, page) {
    this.fetchAudit(page)
  }

  onChangeFilerApp (e) {
    this.setState({
      filterApp: e.target.value
    }, () => this.fetchAudit())
  }

  ////////////////////////////////////

  onFocusChange(focusedInput) {
    this.setState({ focusedInput })
  }

  onChangeDates({ startDate, endDate }) {
    this.setState({ startDate, endDate }, () => this.fetchAudit())
  }

  ////////////////////////////////////

  onClickDetail (message) {
    this.props.showAuditDetailModal(true, message)
  }

  onClickWf (wfId) {
    this.props.history.push(`/audits/workflow/${wfId}`)
  }

  ////////////////////////////////////
  renderDatePresets() {
    return (
      <div className="padding-md-left">
        {presets.map(({ text, start, end }) => {
          return (
            <div
              key={text}
              className="datepicker-preset"
              onClick={() => this.setState({ startDate: start, endDate: end })}
            >
              {text}
            </div>
          )
        })}
      </div>
    )
  }

  renderAudit () {
    const {auditPage} = this.props

    this.buildTooltip()

    return (
      <div>
        <Table style={{margin: 'auto', width: 'initial'}} className="bg-white">
          <TableHead>
            <TableRow style={{height: 30}}>
              {this.auditColumns.map(column => {
                return (
                  <TableCell key={column.id} padding={column.padding} style={column.style}>
                    {column.label}
                  </TableCell>
                )
              }, this)}
            </TableRow>
          </TableHead>

          <TableBody>
            {auditPage.page.map(p => {
              const component = p.component || 'srflow'
              let iconSize = 32
              if (component === 'connector' && p.action === 'Incoming') iconSize = 32
              return (
                <TableRow key={p.id} style={{height: 30}}>
                  <TableCell
                    className="nowrap"
                    padding={this.auditColumns[0].padding}
                    style={this.auditColumns[0].style}
                  >
                    {moment(p.dateCreated).format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell>
                  <TableCell
                    padding={this.auditColumns[1].padding}
                    style={this.auditColumns[1].style}
                  >
                    {icons[p.channel] ? <img src={`/images/${icons[p.channel]}`} alt="" width={iconSize}/> : p.channel}
                  </TableCell>
                  <TableCell
                    padding={this.auditColumns[2].padding}
                    style={this.auditColumns[2].style}
                  >
                    {icons[component] ? <img src={`/images/${icons[component]}`} alt="" width="32"/> : component}
                  </TableCell>
                  <TableCell padding={this.auditColumns[3].padding}>{p.action}</TableCell>
                  <TableCell padding={this.auditColumns[4].padding}>
                    <span className="valign-middle">{p.description}</span>
                    <img className="link valign-middle margin-sm-left" data-tip={p.userConnectorId} alt="" src="/images/userid.png" width="16"/>
                  </TableCell>
                  <TableCell className="nowrap" padding={this.auditColumns[5].padding}>
                    {p.message && <MessageIcon className="link valign-middle" onClick={this.onClickDetail.bind(this, p.message)}/>}
                    {p.action === 'Running Requested Workflows' && p.messageUniqueId &&
                    <img className="link valign-middle" onClick={this.onClickWf.bind(this, p.messageUniqueId)} width="32" src="/images/wf.png" alt=""/>
                    }
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={auditPage.totalElements}
                rowsPerPage={auditPage.size}
                page={auditPage.number}
                onChangePage={this.handleChangePage.bind(this)}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  }

  renderDetailModal () {
    if (!this.props.auditDetailModalOpen) return null
    return (
      <AuditDetailModal {...this.props}/>
    )
  }

  renderToolbar () {
    return (
      <div>
        <div className="pull-left margin-md-right">
          <DateRangePicker
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={this.onChangeDates.bind(this)}
            onFocusChange={this.onFocusChange.bind(this)}
            focusedInput={this.state.focusedInput}
            startDateId="startDateId"
            endDateId="endDateId"
            renderCalendarInfo={this.renderDatePresets.bind(this)}

            enableOutsideDays={false}
            isDayBlocked={() => false}
            isOutsideRange={() => false}
            isDayHighlighted={() => false}
            keepOpenOnDateSelect={false}
            readOnly
          />
        </div>

        <div className="pull-left">
          <TextField value={this.state.txtConnectorId}
                     onChange={this.onChangeConnectorId.bind(this)} label="User Connector Id"
                     style={{width: 350}}
                     className="valign-top"/>

          <FormControl
            style={{minWidth: 160}}
            className="valign-top margin-md-left"
          >
            <InputLabel>App</InputLabel>
            <Select
              value={this.state.filterApp}
              onChange={this.onChangeFilerApp.bind(this)}>
              <MenuItem value="aaa">AAA</MenuItem>
              <MenuItem value="connector">Connector</MenuItem>
              <MenuItem value="eddie">Eddie</MenuItem>
              <MenuItem value="im">IM</MenuItem>
              <MenuItem value="srflow">Srflow</MenuItem>
            </Select>
          </FormControl>

          <IconButton onClick={this.onClickSearch.bind(this)} className="hidden">
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    )
  }
  render () {
    return (
      <TabPage>
        <TabPageHeader title="Audit">
          {this.renderToolbar()}
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={6} history={this.props.history} location={this.props.location}>
          <div className="flex-1"style={flexStyle}>
            {this.renderAudit()}
          </div>
          {this.renderDetailModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
