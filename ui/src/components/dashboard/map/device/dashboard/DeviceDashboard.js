import React from 'react'
import moment from 'moment'
import {concat, assign} from 'lodash'

import ServiceUsage from './ServiceUsage'
import TopService from './TopService'
import ServicePerformance from './ServicePerformance'

import DurationModal from './DurationModal'
import InfiniteTable from 'components/common/InfiniteTable'

export default class DeviceDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      paramServiceUsage: {
        value: 3,
        period: 'hour',
        unit: 'hour'
      },
      paramTopService: {
        value: 3,
        period: 'hour'
      },
      paramServicePerformance: {
        value: 3,
        period: 'hour',
        unit: 'hour'
      },

      durationModalOpen: false,
      values: {},
      hideUnit: false
    }

    this.cells = [{
      'displayName': 'Date/Time',
      'columnName': 'dateCreated',
      'cssClassName': 'width-160',
      'customComponent': (props) => {
        let val = props.data
        return <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    }, {
      'displayName': 'IP',
      'cssClassName': 'width-100',
      'columnName': 'ip'
    }, {
      'displayName': 'Server',
      'cssClassName': 'width-100',
      'columnName': 'server'
    }, {
      'displayName': 'Event',
      'columnName': 'event'
    }]
  }

  componentWillMount () {
    this.props.fetchGroupDevicesAndLines(this.props.device.id)
    this.props.fetchSysSearchOptions()
    // this.props.fetchIncidents()
    //
    // this.fetchServiceUsage()
    // this.fetchTopService()
    // this.fetchServicePerformance()
  }

  fetchServiceUsage () {
    // const { paramServiceUsage } = this.state
    // this.props.fetchServiceUsage(paramServiceUsage)
  }

  fetchTopService () {
    // const { paramTopService } = this.state
    // this.props.fetchTopService(paramTopService)
  }

  fetchServicePerformance () {
    // const { paramServicePerformance } = this.state
    // this.props.fetchServicePerformance(paramServicePerformance)
  }

  getGauges () {
    const {mapDevices} = this.props
    return mapDevices/*.filter(p => p.params && !!p.params.graph)*/
  }

  getUserSearchOptions () {
    const {userInfo} = this.props
    if (!userInfo) return []
    const {searchOptions} = userInfo
    if (!searchOptions) return []
    try {
      return JSON.parse(searchOptions)
    } catch (e) {
      console.log(e)
    }
    return []
  }

  getSearchList () {
    const {sysSearchOptions} = this.props
    return concat([], this.getUserSearchOptions().map(p => {
      return assign({}, p, {
        type: 'User'
      })
    }), sysSearchOptions.map(p => {
      return assign({}, p, {
        type: 'System'
      })
    }))
  }

  renderIncidentTable () {
    return (
      <InfiniteTable
        cells={this.cells}
        ref="credentials"
        rowMetadata={{'key': 'id'}}

        useExternal={false}
        data={this.props.incidents}
      />
    )
  }

  renderServiceUsageChart () {
    return (
      <div className="chart-container flex-1">
        <ServiceUsage data={this.props.serviceUsage}/>
      </div>
    )
  }

  renderTopServiceChart () {
    return (
      <div className="chart-container flex-1">
        <TopService data={this.props.topService}/>
      </div>
    )
  }

  renderServicePerformanceChart () {
    return (
      <div className="chart-container flex-1">
        <ServicePerformance data={this.props.servicePerformance}/>
      </div>
    )
  }

  // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onUsageCalendar () {
    const { paramServiceUsage } = this.state
    this.showDurationModal(paramServiceUsage, (data) => {
      this.setState({ paramServiceUsage: data }, () => {
        this.fetchServiceUsage()
      })
    })
  }

  onTopServiceCalendar () {
    const { paramTopService } = this.state
    this.showDurationModal(paramTopService, (data) => {
      this.setState({ paramTopService: data }, () => {
        this.fetchTopService()
      })
    }, true)
  }

  onPerformanceCalendar () {
    const { paramServicePerformance } = this.state
    this.showDurationModal(paramServicePerformance, (data) => {
      this.setState({ paramServicePerformance: data }, () => {
        this.fetchServicePerformance()
      })
    })
  }

  showDurationModal (values, durationCb, hideUnit) {
    this.setState({
      durationModalOpen: true,
      values,
      hideUnit,
      durationCb
    })
  }

  onCloseDuration (cb, modal, data) {
    this.setState({durationModalOpen: false})
    if (!data) return

    cb && cb(data)
  }

  renderDurationModal () {
    if (!this.state.durationModalOpen) return

    const { values, durationCb, hideUnit } = this.state
    return (
      <DurationModal values={values} onClose={this.onCloseDuration.bind(this, durationCb)} hideUnit={hideUnit} />
    )
  }

  render1 () {
    return (
      <div className="row-chart padding-md-top">
        <div className="col-md-6 flex-vertical">
          <div className="panel panel-red flex-vertical flex-1">
            <div className="panel-heading">
              <h4 className="panel-title"><i className="fa fa-bell-o fa-lg margin-sm-right"/>Incidents</h4>
              <div className="panel-options">
                <a href="javascript:;" onClick={this.props.fetchIncidents}><i className="fa fa-2x fa-refresh" /></a>
              </div>
            </div>
            <div className="panel-body flex-vertical flex-1">
              <div className="chart-container flex-1">
                {this.renderIncidentTable()}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 flex-vertical">
          <div className="panel panel-blue flex-vertical flex-1">
            <div className="panel-heading">
              <h4 className="panel-title"><i className="fa fa-bar-chart fa-lg margin-sm-right"/>Services Usage</h4>
              <div className="panel-options">
                <a href="javascript:;" onClick={this.onUsageCalendar.bind(this)}><i className="fa fa-2x fa-calendar" /></a>
                &nbsp;&nbsp;&nbsp;
                <a href="javascript:;" onClick={this.fetchServiceUsage.bind(this)}><i className="fa fa-2x fa-refresh" /></a>
              </div>
            </div>
            <div className="panel-body flex-vertical flex-1">
              {this.renderServiceUsageChart()}
            </div>
          </div>
        </div>

        <div className="col-md-6 flex-vertical">
          <div className="panel panel-green flex-vertical flex-1">
            <div className="panel-heading">
              <h4 className="panel-title"><i className="fa fa-pie-chart fa-lg margin-sm-right"/>Top Services</h4>
              <div className="panel-options">
                <a href="javascript:;" onClick={this.onTopServiceCalendar.bind(this)}><i className="fa fa-2x fa-calendar" /></a>
                &nbsp;&nbsp;&nbsp;
                <a href="javascript:;" onClick={this.fetchTopService.bind(this)}><i className="fa fa-2x fa-refresh" /></a>
              </div>
            </div>
            <div className="panel-body flex-vertical flex-1">
              {this.renderTopServiceChart()}
            </div>
          </div>
        </div>
        <div className="col-md-6 flex-vertical">
          <div className="panel panel-purple flex-vertical flex-1">
            <div className="panel-heading">
              <h4 className="panel-title"><i className="fa fa-tachometer fa-lg margin-sm-right"/>Services Performance</h4>
              <div className="panel-options">
                <a href="javascript:;" onClick={this.onPerformanceCalendar.bind(this)}><i className="fa fa-2x fa-calendar" /></a>
                &nbsp;&nbsp;&nbsp;
                <a href="javascript:;" onClick={this.fetchServicePerformance.bind(this)}><i className="fa fa-2x fa-refresh" /></a>
              </div>
            </div>
            <div className="panel-body flex-vertical flex-1">
              {this.renderServicePerformanceChart()}
            </div>
          </div>
        </div>

        {this.renderDurationModal()}
      </div>
    )
  }
  renderGauge (p) {
    return (
      <div className="col-md-6 flex-vertical" style={{height: 300}} key={p.id}>
        <div className="panel panel-blue flex-vertical flex-1">
          <div className="panel-heading">
            <h4 className="panel-title"><i className="fa fa-bar-chart fa-lg margin-sm-right"/>{p.name}</h4>
            <div className="panel-options">
              <a href="javascript:;" onClick={this.onUsageCalendar.bind(this)}><i className="fa fa-2x fa-calendar" /></a>
              &nbsp;&nbsp;&nbsp;
              <a href="javascript:;" onClick={this.fetchServiceUsage.bind(this)}><i className="fa fa-2x fa-refresh" /></a>
            </div>
          </div>
          <div className="panel-body flex-vertical flex-1">
            {this.renderServiceUsageChart()}
          </div>
        </div>
      </div>
    )
  }
  render () {
    return (
      <div className="padding-md-top">
        {this.getGauges().map(p => this.renderGauge(p))}
      </div>
    )
  }
}
