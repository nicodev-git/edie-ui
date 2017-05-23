import React, { Component } from 'react'
import moment from 'moment'
import { findIndex, assign } from 'lodash'
import {
  RaisedButton,
  MenuItem,
  Menu,
  Popover,
  SelectField,
  TextField,
  FlatButton
} from 'material-ui'
import TimeAgo from 'react-timeago'
import ReactTooltip from 'react-tooltip'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import ActionSearch from 'material-ui/svg-icons/action/search'

import DateRangePicker from '../../../../../shared/DateRangePicker2'
import InfiniteTable from 'components/shared/InfiniteTable'
import AddIncidentModal from './AddIncidentModal'
import AddExceptionModal from './AddExceptionModal'
import CommentsModal from '../../../../../shared/incident/CommentsModal'

import { showAlert, showConfirm } from '../../../../../shared/Alert'
import { getSeverityIcon, parseSearchQuery, dateFormat, encodeUrlParams, severities } from 'shared/Global'
import MainTabs from '../MainTabs'
import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'
import {
  showIncidentDetail,
  showIncidentRaw
} from '../../../../../shared/incident/Incident'
import {
  errorStyle, underlineFocusStyle, inputStyle, selectedItemStyle, underlineStyle,
  thumbup, thumpdown, done, notdone,
  rawtext, reason, openicon
} from 'style/materialStyles'

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
      'cssClassName': 'nowrap width-220',
      'customComponent': (p) => {
        const row = p.rowData
        setTimeout(() => {
          ReactTooltip.rebuild()
        }, 1)
        return (
          <div className="table-icons-container">
            <div onClick={() => { showIncidentDetail.bind(null, row) }}>
              {openicon}
            </div>
            &nbsp;

            <div onClick={() => { props.ackIncident(row) }}>
              {row.acknowledged ? thumbup : thumpdown}
            </div>
            &nbsp;

            <div onClick={() => { props.fixIncident(row) }}>
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

  onClickFixSelected () {
    const selected = this.getTable().getSelected(true)
    if (!selected.length) return showAlert('Please select incidents.')
    this.props.fixDeviceIncidents(selected.map(s => s.id))
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
    const query = `deviceid=${this.props.device.id}`
    const queryChips = parseSearchQuery(query)
    this.props.router.push('/search')
    this.props.updateSearchParams(assign({}, this.props.params, {
      query,
      severity: 'HIGH,MEDIUM',
      collections: 'event',
      workflow: '',
      dateFrom: moment().startOf('year').format(dateFormat),
      dateTo: moment().endOf('year').format(dateFormat)
    }))

    this.props.replaceSearchWfs([])
    this.props.updateQueryChips(queryChips)
  }

  onChangeSeverity (e, index, values) {
    console.log(arguments)
    this.setState({
      selectedSeverity: values
    }, this.onFilterChange)
  }

  onFilterChange () {
    this.setState({
      params: this.getParams()
    })
  }

  onFixedChange (e, index, value) {
    this.setState({
      fixed: value
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
      selectedIndex: findIndex(this.props.incidents, {id: incident.id}),
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
      <RaisedButton label={label}/>
    )
  }

  onClickGroup (groupId) {
    this.props.closeDevice()
    this.props.router.push(`/device/${groupId}/topology`)
  }

  renderHeaderOptions () {
    const {device} = this.props
    if (!device.groupid) return null
    return (
      <div>
        <FlatButton icon={<ArrowBack />} label="Group" onClick={this.onClickGroup.bind(this, device.groupid)}/>
      </div>
    )
  }

  render () {
    const {device, incidents} = this.props
    const {selectedIndex, selectedSeverity, afterStartTimestamp, beforeStartTimestamp, text} = this.state

    let selectedIncident = selectedIndex < 0 ? null : incidents[selectedIndex]

    return (
      <TabPage>
        <TabPageHeader title={device.name} headerOptions={this.renderHeaderOptions()}>
          <div className="text-center margin-md-top">
            <div className="pull-left">
              <div className="text-left form-mui-inline">
                <SelectField
                  errorStyle={errorStyle}
                  underlineStyle={underlineFocusStyle}
                  selectedMenuItemStyle={selectedItemStyle}
                  menuItemStyle={inputStyle}
                  labelStyle={inputStyle}
                  multiple
                  hintText="Select severities"
                  onChange={this.onChangeSeverity.bind(this)}
                  value={selectedSeverity}
                >
                  {severities.map(option =>
                    <MenuItem
                      key={option.value}
                      insetChildren
                      checked={selectedSeverity && selectedSeverity.includes(option.value)}
                      value={option.value}
                      primaryText={option.label}
                    />
                  )}
                </SelectField>

                <SelectField
                  onChange={this.onFixedChange.bind(this)}
                  value={this.state.fixed}
                  className="margin-md-left"
                  errorStyle={errorStyle}
                  underlineStyle={underlineFocusStyle}
                  selectedMenuItemStyle={selectedItemStyle}
                  menuItemStyle={inputStyle}
                  labelStyle={inputStyle}>
                  <MenuItem primaryText="Any" value=""/>
                  <MenuItem primaryText="Unfixed" value="false"/>
                  <MenuItem primaryText="Fixed" value="true"/>
                </SelectField>

                <DateRangePicker
                  startDate={moment(afterStartTimestamp)}
                  endDate={moment(beforeStartTimestamp)}
                  onApply={this.onChangeDateRange.bind(this)}
                  renderer={this.renderDateLabel.bind(this)}/>

                <a href="javascript:;" title="Export" style={{display: 'none'}}><img
                  width="26" src="/images/btn-export.jpg"/></a>
              </div>
            </div>

            <div className="pull-right">
              <RaisedButton label="Open" onTouchTap={this.onClickOpen.bind(this)}/>&nbsp;
              <RaisedButton label="Fix All" onTouchTap={this.onClickFixAll.bind(this)}/>&nbsp;
              <RaisedButton label="Fix Selected" onTouchTap={this.onClickFixSelected.bind(this)}/>&nbsp;
              <RaisedButton label="More" primary onTouchTap={this.handleTouchTap.bind(this)}/>&nbsp;
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose.bind(this)}
              >
                <Menu>
                  <MenuItem primaryText="Events" onTouchTap={this.onClickEvents.bind(this)}/>
                  <MenuItem primaryText="Add Incident" onTouchTap={this.onClickAddIncident.bind(this)}/>
                  <MenuItem primaryText="Add Exception" onTouchTap={this.onClickAddException.bind(this)}/>
                  <MenuItem primaryText="Export PDF" onTouchTap={this.onClickPDF.bind(this)}/>
                </Menu>
              </Popover>
            </div>

            <div style={{margin: '0 auto', position: 'relative', display: 'inline-block', textAlign: 'center'}}>
              <div className="inline-block" style={{position: 'relative'}}>
                <TextField
                  hintText={<ActionSearch style={{bottom: '5px'}} color="#888888"/>}
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

        <TabPageBody tabs={MainTabs(device.id)} tab={0}>
          {this.renderTable()}
          {this.props.addIncidentModalVisible &&
          <AddIncidentModal {...this.props} open device={this.props.device}/>}
          {this.state.openExceptionModal &&
          <AddExceptionModal
            open incident={selectedIncident}
            onClose={this.onCloseExceptionModal.bind(this)}/>}

          {this.state.commentModalVisible &&
          <CommentsModal
            incident={selectedIncident}
            onClose={() => {
              this.setState({commentModalVisible: false})
            }}/>}

          <ReactTooltip />
        </TabPageBody>
      </TabPage>
    )
  }
}
