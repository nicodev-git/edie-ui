import React from 'react'
import moment from 'moment'
import TimeAgo from 'react-timeago'
import ReactTooltip from 'react-tooltip'
import { RaisedButton } from 'material-ui'
import { assign } from 'lodash'

import InfiniteTable from '../../../shared/InfiniteTable'

import { getSeverityIcon } from '../../../../shared/Global'
import SearchTabs from './SearchTabs'
import TabPage from '../../../shared/TabPage'
import TabPageBody from '../../../shared/TabPageBody'
import TabPageHeader from '../../../shared/TabPageHeader'
import { showConfirm } from 'components/shared/Alert'

import DeviceSearchModal from './DeviceSearchModal'
import IncidentsFormView from './IncidentsFormView'

import {
    showIncidentDetail,
    showIncidentRaw
} from '../../../shared/incident/Incident'
import { thumbup, thumpdown, done, notdone, openicon, reasonx,
  rawtext, reason } from '../../../../style/materialStyles'

const fixedOptions = [
  {label: 'Any', value: ''},
  {label: 'Unfixed', value: 'false'},
  {label: 'Fixed', value: 'true'}
]

const severities = [
  { label: 'High', value: 'HIGH' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'Low', value: 'LOW' },
  { label: 'Audit', value: 'AUDIT' },
  { label: 'Ignore', value: 'IGNORE' }
]

export default class Incidents extends React.Component {
  constructor (props) {
    super(props)

    const {filterType} = props.location.state
    let afterStartTimestamp = ''
    let beforeStartTimestamp = ''
    if (filterType === 'today') {
      afterStartTimestamp = moment().startOf('day').valueOf()
      beforeStartTimestamp = moment().endOf('day').valueOf()
    } else if (filterType === 'month') {
      afterStartTimestamp = moment().startOf('month').valueOf()
      beforeStartTimestamp = moment().endOf('month').valueOf()
    } else {
      afterStartTimestamp = moment().startOf('year').valueOf()
      beforeStartTimestamp = moment().endOf('year').valueOf()
    }

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
      afterStartTimestamp,
      beforeStartTimestamp,
      fixed: false,
      search: '',

      selectedIndex: -1,
      commentModalVisible: false,

      deviceModalVisible: false
    }

    this.cellIncidents = [{
      'displayName': 'Severity',
      'columnName': 'severity',
      'cssClassName': 'text-center width-80',
      'customComponent': (props) => {
        return <span>{getSeverityIcon(props.data)}</span> // eslint-disable-line react/no-danger
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
          <div className = "table-icons-container">
            <div onClick={showIncidentDetail.bind(null, row)}>
                {openicon}
            </div>

            <div onClick={() => { props.ackIncident(row) }}>
              {row.acknowledged ? thumbup : thumpdown}
            </div>

            <div onClick={() => { props.fixIncident(row) }}>
                {row.fixed ? done : notdone}
            </div>

            <div onClick={showIncidentRaw.bind(null, row)}>
                {rawtext}
            </div>
            {
              (row.fixed && !row.whathappened)
                ? <div
                  onClick={this.showIncidentComments.bind(this, row)}>
                  {row.lastcomment ? reason : reasonx}
                </div>
                : null
            }
          </div>
        )
      }
    }]
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
      <RaisedButton className="margin-md-left valign-top" label={label} onClick={this.onClickSearchDevice.bind(this)} />
    )
  }

  renderTable () {
    // const { search, fixed, selectedSeverity, afterStartTimestamp, beforeStartTimestamp } = this.state
    // const params = {
    //   description: search,
    //   severity: selectedSeverity,
    //   afterStartTimestamp,
    //   beforeStartTimestamp,
    //   fixed,
    //   deviceid: this.state.selectedDevices.length === 0 ? '*' : this.state.selectedDevices.map(item => item.id),
    //   sort: 'startTimestamp,desc',
    //   draw: this.props.incidentDraw
    // }

    return (
      <InfiniteTable
        url="/incident/search/findBy"
        cells={this.cellIncidents}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable
        onRowDblClick={this.onRowDblClick.bind(this)}
        params={this.props.incidentParams}
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

  onChangeSeverity (e, index, values) {
    this.props.updateIncidentSearchParams(assign({}, this.props.incidentParams, {
      severity: values
    }))
  }

  onFixedChange (e, index, value) {
    this.props.updateIncidentSearchParams(assign({}, this.props.incidentParams, {
      fixed: value
    }))
  }

  onChangeRange ({startDate, endDate}) {
    this.props.updateIncidentSearchParams(assign({}, this.props.incidentParams, {
      afterStartTimestamp: startDate.valueOf(),
      beforeStartTimestamp: endDate.valueOf()
    }))
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
    const {incidentParams} = this.props
    return (
      <TabPage>
        <TabPageHeader title="Search">
          <div className="form-inline" style={{margin: '0 auto', position: 'relative', textAlign: 'center'}}>
            <div className="pull-left">
              <IncidentsFormView
                fixedOptions={fixedOptions}
                fixed={incidentParams.fixed}
                onChangeFixed={this.onFixedChange.bind(this)}

                startDate={moment(incidentParams.afterStartTimestamp)}
                endDate={moment(incidentParams.beforeStartTimestamp)}
                onChangeDateRange={this.onChangeRange.bind(this)}

                severities={severities}
                selectedSeverities={incidentParams.severity}
                onChangeSeverity={this.onChangeSeverity.bind(this)}

                deviceSearch={this.renderDeviceSearch()}
              />
            </div>

            <div className="pull-right">
              <RaisedButton onTouchTap={this.onClickFixAll.bind(this)} label="Fix All"/>
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
