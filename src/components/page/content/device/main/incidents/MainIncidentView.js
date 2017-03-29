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

export default class MainIncidentsView extends Component {
  render () {
    const {device, incidents, selectedIndex} = this.props
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
