import React, { Component } from 'react'
import moment from 'moment'
import { findIndex, debounce } from 'lodash'
import {
  Button,
  MenuItem,
  Menu,
  Popover,
  Select,
  TextField
} from '@material-ui/core'
import ReactTooltip from 'react-tooltip'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ActionSearch from '@material-ui/icons/Search'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'

import DateRangePicker from 'components/common/DateRangePicker'
import InfiniteTable from 'components/common/InfiniteTable'
import AddIncidentModal from './AddIncidentModal'
import AddExceptionModal from './AddExceptionModal'
import CommentsModal from 'components/common/incident/CommentsModal'

import { showAlert, showPrompt } from 'components/common/Alert'
import { getSeverityIcon, encodeUrlParams, severities } from 'shared/Global'
import MainTabs from '../MainTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import {
  showIncidentDetail,
  showIncidentRaw
} from 'components/common/incident/Incident'
import {
  errorStyle, inputStyle, underlineStyle,
  thumbup, thumpdown, done, notdone,
  rawtext, reason, openicon
} from 'style/common/materialStyles'

export default class MainIncidents extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedSeverity: ['HIGH', 'MEDIUM'],

      selectedIndex: -1,
      fixed: 'false',
      text: '',
      afterStartTimestamp: moment().startOf('year').valueOf(),
      beforeStartTimestamp: moment().endOf('year').valueOf(),

      currentSortCol: 'startTimestamp',
      currentSortDir: 'desc',

      openExceptionModal: false,
      commentModalVisible: false,
      params: {},

      incident: null
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
            {moment(new Date(data)).fromNow()}
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
      'cssClassName': 'nowrap width-220',
      'customComponent': (p) => {
        const row = p.rowData
        return (
          <div className="table-icons-container">
            <div onClick={() => showIncidentDetail(row)}>
              {openicon}
            </div>
            &nbsp;

            <div onClick={() => { props.ackIncident(row) }}>
              {row.acknowledged ? thumbup : thumpdown}
            </div>
            &nbsp;

            <div onClick={() => this.onClickFixIncident(row)}>
              {row.fixed ? done : notdone}
            </div>
            &nbsp;

            <div onClick={showIncidentRaw.bind(null, row)}>
              {rawtext}
            </div>
            &nbsp;

            {
              (row.fixed && !row.whathappened)
                ? <div onClick={this.showIncidentComments.bind(this, row)}>
                {reason}
              </div>
                : null
            }

          </div>
        )
      }
    }]

    this.tooltipRebuild = debounce(ReactTooltip.rebuild, 100)

    // ///////////////////////////////////////

    this.onFilterChange = this.onFilterChange.bind(this)
  }

  componentDidMount () {
    this.onFilterChange()
  }
  onClickFixIncident (incident) {
    showPrompt('Please type comment.', '', text => {
      if (!text) return

      const {userInfo} = this.props
      const user = userInfo ? userInfo.username : 'User'

      this.props.fixIncident(incident, user, text)
    })
  }

  onResultCountUpdate (total, data) {
    this.tooltipRebuild()
  }

  renderColHeader (col) {
    const {columnId, title} = col
    const { currentSortCol, currentSortDir } = this.state
    let caretEl = null

    if (columnId === currentSortCol) {
      caretEl = currentSortDir === 'asc' ? '▲': '▼  '
    }

    return (
      <div className="nowrap text-black link" onClick={this.onClickColHeader.bind(this, col)}>
        {title}{caretEl}
      </div>
    )
  }

  renderTable () {
    const params = this.getParams()

    return (
      <InfiniteTable
        cells={this.cells}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable
        allowMultiSelect
        onRowDblClick={this.onRowDblClick.bind(this)}

        url="/incident/search/findBy"
        params={params}

        onUpdateCount={this.onResultCountUpdate.bind(this)}
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
    showPrompt('Please type comment.', '', text => {
      if (!text) return

      const {userInfo} = this.props
      const user = userInfo ? userInfo.username : 'User'

      this.props.fixAllDeviceIncidents(this.props.device, user, text)
    })
  }

  onClickFixSelected () {
    const selected = this.getTable().getSelected(true)
    if (!selected.length) return showAlert('Please select incidents.')

    showPrompt('Please type comment.', '', text => {
      if (!text) return

      const {userInfo} = this.props
      const user = userInfo ? userInfo.username : 'User'

      this.props.fixDeviceIncidents(selected.map(s => s.id), user, text)
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

  onClickEvents () {
    const q = [
      '(type:event)',
      `(from:Ever)`,
      `(deviceid:${this.props.device.id})`
    ].join(' AND ')

    this.props.updateQueryParams({
      q
    }, {
      q: `(deviceid:${this.props.device.id})`,
      types: 'event'
    }, this.props.history)
  }

  onChangeSeverity (e) {
    console.log(arguments)
    this.setState({
      selectedSeverity: e.target.value
    }, this.onFilterChange)
  }

  onFilterChange () {
    this.setState({
      params: this.getParams()
    })
  }

  onFixedChange (e) {
    this.setState({
      fixed: e.target.value
    }, () => {
      this.onFilterChange()
    })
  }

  onChangeText (e, text) {
    this.setState({
      text
    }, () => this.onFilterChange())
  }

  onChangeDateRange ({startDate, endDate}) {
    this.setState({
      afterStartTimestamp: startDate.valueOf(),
      beforeStartTimestamp: endDate.valueOf()
    }, () => {
      this.onFilterChange()
    })
  }

  getParams () {
    const { currentSortCol, currentSortDir, selectedSeverity, fixed, afterStartTimestamp, beforeStartTimestamp, text } = this.state

    let params = {
      draw: this.props.incidentDraw,
      description: text || '""',
      severity: selectedSeverity,
      afterStartTimestamp,
      beforeStartTimestamp,
      deviceid: this.props.device.id,
      sort: `${currentSortCol},${currentSortDir}`
    }
    if (fixed) params.fixed = fixed

    return params
  }

  showIncidentComments (incident) {
    this.setState({
      incident,
      commentModalVisible: true
    })
  }

  getTable () {
    return this.refs.table
  }

  handleTouchTap (event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose () {
    this.setState({open: false})
  }

  renderDateLabel (label) {
    return (
      <Button variant="raised">{label}</Button>
    )
  }

  onClickGroup (groupId) {
    this.props.closeDevice()
    this.props.history.push(`/device/${groupId}/dashboard`)
  }

  renderHeaderOptions () {
    const {device} = this.props
    if (!device.groupid) return null
    return (
      <div>
        <Button variant="flat" onClick={this.onClickGroup.bind(this, device.groupid)}>
          <ArrowBack />Group
        </Button>
      </div>
    )
  }

  render () {
    const {device, incidents} = this.props
    const {selectedIndex, selectedSeverity, afterStartTimestamp, beforeStartTimestamp, text, incident} = this.state

    let selectedIncident = selectedIndex < 0 ? null : incidents[selectedIndex]

    return (
      <TabPage>
        <TabPageHeader title={device.name} headerOptions={this.renderHeaderOptions()}>
          <div className="text-center margin-md-top">
            <div className="pull-left">
              <div className="text-left form-mui-inline">
                <FormControl>
                  <InputLabel>Select severities</InputLabel>
                  <Select
                    multiple
                    onChange={this.onChangeSeverity.bind(this)}
                    value={selectedSeverity}
                    style={{width: '160px'}}
                  >
                    {severities.map(option =>
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    )}
                  </Select>
                </FormControl>

                <FormControl className="margin-md-left">
                  <InputLabel>Select severities</InputLabel>
                  <Select
                    onChange={this.onFixedChange.bind(this)}
                    value={this.state.fixed}
                    style={{width: '120px'}}>
                    <MenuItem value="">Any</MenuItem>
                    <MenuItem value="false">Unfixed</MenuItem>
                    <MenuItem value="true">Fixed</MenuItem>
                  </Select>
                </FormControl>

                <DateRangePicker
                  startDate={moment(afterStartTimestamp)}
                  endDate={moment(beforeStartTimestamp)}
                  onApply={this.onChangeDateRange.bind(this)}
                  renderer={this.renderDateLabel.bind(this)}/>
              </div>
            </div>

            <div className="pull-right">
              <Button variant="raised" onClick={this.onClickOpen.bind(this)}>Open</Button>&nbsp;
              <Button variant="raised" onClick={this.onClickFixAll.bind(this)}>Fix All</Button>&nbsp;
              <Button variant="raised" onClick={this.onClickFixSelected.bind(this)}>Fix Selected</Button>&nbsp;
              <Button variant="raised" color="primary" onClick={this.handleTouchTap.bind(this)}>More</Button>&nbsp;
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                onClose={this.handleRequestClose.bind(this)}
              >
                <Menu>
                  <MenuItem onClick={this.onClickEvents.bind(this)}>Events</MenuItem>
                  <MenuItem onClick={this.onClickAddIncident.bind(this)}>Add Incident</MenuItem>
                  <MenuItem onClick={this.onClickAddException.bind(this)}>Add Exception</MenuItem>
                  <MenuItem onClick={this.onClickPDF.bind(this)}>Export PDF</MenuItem>
                </Menu>
              </Popover>
            </div>

            <div style={{margin: '0 auto', position: 'relative', display: 'inline-block', textAlign: 'center'}}>
              <div className="inline-block" style={{position: 'relative'}}>
                <TextField
                  label={<ActionSearch style={{bottom: '5px'}} color="#888888"/>}
                  errorStyle={errorStyle}
                  inputStyle={inputStyle}
                  underlineFocusStyle={underlineStyle}
                  onChange={this.onChangeText.bind(this)}
                  value={text}
                />
              </div>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={MainTabs(device.id)} tab={0} history={this.props.history} location={this.props.location} transparent>
          {this.renderTable()}
          {this.props.addIncidentModalVisible &&
          <AddIncidentModal {...this.props} open device={this.props.device}/>}
          {this.state.openExceptionModal &&
          <AddExceptionModal
            open incident={selectedIncident}
            onClose={this.onCloseExceptionModal.bind(this)}/>}

          {this.state.commentModalVisible &&
          <CommentsModal
            incident={incident}
            updateDeviceIncident={this.props.updateDeviceIncident}
            onClose={() => {
              this.setState({commentModalVisible: false})
            }}/>}

          <ReactTooltip />
        </TabPageBody>
      </TabPage>
    )
  }
}
