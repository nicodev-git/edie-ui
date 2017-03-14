import React from 'react'
import Select from 'react-select'
import moment from 'moment'
import TimeAgo from 'react-timeago'
import ReactTooltip from 'react-tooltip'
import {
  ButtonGroup,
  Button
} from 'react-bootstrap'

import DateRangePicker from '../../../shared/DateRangePicker'
import {ResponsiveInfiniteTable} from '../../../shared/InfiniteTable'

import { getSeverityIcon } from '../../../../shared/Global'
import SearchTabs from './SearchTabs'
import TabPage from '../../../shared/TabPage'
import TabPageBody from '../../../shared/TabPageBody'
import TabPageHeader from '../../../shared/TabPageHeader'
import { showConfirm } from 'components/shared/Alert'

import DeviceSearchModal from './DeviceSearchModal'

import {
    showIncidentDetail,
    showIncidentRaw
} from '../../../shared/incident/Incident'

export default class Incidents extends React.Component {
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
      selectedDevices: [],
      afterStartTimestamp: '',
      beforeStartTimestamp: '',
      fixed: false,
      search: '',

      selectedIndex: -1,
      commentModalVisible: false,

      deviceModalVisible: false
    }

    this.cellIncidents = [{
      'displayName': 'Severity',
      'columnName': 'severity',
      'cssClassName': 'text-center width-60',
      'customComponent': (props) => {
        return <span dangerouslySetInnerHTML={{__html: getSeverityIcon(props.data)}}/> // eslint-disable-line react/no-danger
      }
    }, {
      'displayName': 'Date/Time',
      'columnName': 'startTimestamp',
      'cssClassName': 'nowrap text-center width-140',
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
      'displayName': 'Device',
      'columnName': 'devicename',
      'cssClassName': 'nowrap text-center width-140'
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
              <img style={{height: '30px'}} title="Acknowledge" src={`/images/${row.acknowledged ? 'ack.png' : 'noack.png'}`} />
            </a>
            &nbsp;

            <a href="javascript:;" onClick={() => { props.fixIncident(row) }}>
              <img style={{height: '30px'}} title="Acknowledge" src={`/images/${row.fixed ? 'ok.png' : 'notok.png'}`} />
            </a>
            &nbsp;

            <button className="btn btn-primary btn-xs" onClick={showIncidentRaw.bind(null, row)}>Raw</button>
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
  }

  componentDidMount () {
    this.onChangeRange()
  }

  renderDeviceSearch () {
    const {selectedDevices} = this.state
    let label = 'All Devices'

    if (selectedDevices.length === 0) {
      label = 'All Devices'
    } else if (selectedDevices.length === 1) {
      label = selectedDevices[0].name
    } else {
      label = `${selectedDevices.length} Devices`
    }
    return (
      <a href="javascript:;" className="margin-md-left"
        onClick={this.onClickSearchDevice.bind(this)}>
          {label}
      </a>
    )
  }

  renderTable () {
    const { search, fixed, selectedSeverity, afterStartTimestamp, beforeStartTimestamp } = this.state
    const params = {
      description: search,
      severity: selectedSeverity,
      afterStartTimestamp,
      beforeStartTimestamp,
      fixed,
      deviceid: this.state.selectedDevices.length === 0 ? '*' : this.state.selectedDevices.map(item => item.id),
      sort: 'startTimestamp,desc',
      draw: this.props.incidentDraw
    }

    return (
      <ResponsiveInfiniteTable
        url="/incident/search/findBy"
        cells={this.cellIncidents}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable
        onRowDblClick={this.onRowDblClick.bind(this)}
        params={params}
      />
    )
  }

  renderDeviceModal () {
    if (!this.state.deviceModalVisible) return null

    return (
      <DeviceSearchModal
        {...this.props}
        devices={this.state.selectedDevices}
        onClose={this.onCloseSearchDevice.bind(this)}/>
    )
  }

  onRowDblClick (sel) {
    showIncidentDetail(sel)
  }

  onChangeSeverity (selected) {
    this.setState({
      selectedSeverity: selected.map(item => item.value)
    })
  }

  onFixedChange (e) {
    this.setState({
      fixed: e.target.value || null
    })
  }

  onChangeRange (e) {
    const {dp} = this.refs
    this.setState({
      afterStartTimestamp: dp.getStartDate().valueOf(),
      beforeStartTimestamp: dp.getEndDate().valueOf()
    })
  }

  onClickSearchDevice () {
    this.setState({
      deviceModalVisible: true
    })
  }

  onCloseSearchDevice (modal, selectedDevices) {
    this.setState({
      deviceModalVisible: false
    })

    if (!selectedDevices) return

    this.setState({
      selectedDevices
    })
  }

  showIncidentComments (incident) {
    this.setState({
      selectedIndex: findIndex(this.props.incidents, {id: incident.id}), // eslint-disable-line no-undef
      commentModalVisible: true
    })
  }

  onClickFixAll () {
    const {location} = this.props
    const {state} = location || {}
    const {filterType} = state || {}

    const type = filterType || 'open'
    showConfirm(`Click OK to fix all ${type} incidents.`, btn => {
      if (btn !== 'ok') return
      this.props.fixAllIncidentsByType(type)
    })
  }

  render () {
    const {location} = this.props
    const {state} = location || {}
    const {filterType} = state || {}

    let defaultDate = moment().startOf('years').format('YYYY')

    if (filterType === 'today') {
      defaultDate = 'Today'
    } else if (filterType === 'month') {
      defaultDate = moment().startOf('month').format('MMMM')
    }

    return (
      <TabPage>
        <TabPageHeader title="Search">
          <div className="form-inline" style={{margin: '0 auto', position: 'relative', textAlign: 'center'}}>
            <div className="text-left"
              style={{'verticalAlign': 'middle', 'lineHeight': 2.2}}>
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

              <select className="form-control inline text-primary margin-md-left"
                onChange={this.onFixedChange.bind(this)} value={`${this.state.fixed}`}>
                <option value="">Any</option>
                <option value="false">Unfixed</option>
                <option value="true">Fixed</option>
              </select>
              <DateRangePicker onClickRange={this.onChangeRange.bind(this)} className="margin-md-left"
                default={defaultDate} ref="dp">
                <i className="fa fa-caret-down margin-xs-left" />
              </DateRangePicker>

              {this.renderDeviceSearch()}
            </div>

            <div className="pull-right">
              <ButtonGroup>
                <Button onClick={this.onClickFixAll.bind(this)}>Fix All</Button>
              </ButtonGroup>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SearchTabs} tab={0}>
          {this.renderTable()}

          {this.renderDeviceModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
