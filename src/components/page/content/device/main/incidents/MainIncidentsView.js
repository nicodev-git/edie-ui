import React, { Component } from 'react'
import moment from 'moment'
import ReactTooltip from 'react-tooltip'
import DateRangePicker from '../../../../../shared/DateRangePicker'
import AddIncidentModal from './AddIncidentModal'
import AddExceptionModal from './AddExceptionModal'
import CommentsModal from '../../../../../shared/incident/CommentsModal'
import MainTabs from '../MainTabs'
import TabPage from '../../../../../shared/TabPage'
import TabPageBody from '../../../../../shared/TabPageBody'
import TabPageHeader from '../../../../../shared/TabPageHeader'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import SearchBarContainer from 'containers/shared/search/SearchBarContainer'
import { smallInputStyle, selectedItemStyle, primeButtonStyle, primeLabelStyle } from 'style/materialStyles'

export default class MainIncidentsView extends Component {
  render () {
    const {device, incidents, selectedIndex, severities, selectedSeverity} = this.props
    let selectedIncident = selectedIndex < 0 ? null : incidents[selectedIndex]
    let selectedItem = this.props.selectedItem || 'Any'
    return (
      <TabPage>
        <TabPageHeader title={device.name}>
          <div className="text-center margin-md-top flex-panel">

            <div>
              <div className="flex-start width-530 gray-arrows">
                <SelectField
                  style={{width: '180px'}}
                  selectedMenuItemStyle={selectedItemStyle}
                  menuItemStyle={smallInputStyle}
                  labelStyle={smallInputStyle}
                  multiple
                  hintText="Select severities"
                  onChange={this.props.onChangeSeverity}
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
                  style={{width: '125px'}}
                  selectedMenuItemStyle={selectedItemStyle}
                  menuItemStyle={smallInputStyle}
                  labelStyle={smallInputStyle}
                  value={selectedItem}
                  onChange={this.props.onFilterChange}
                >
                  <MenuItem value="Any" primaryText="Any" />
                  <MenuItem value="Unfixed" primaryText="Unfixed" />
                  <MenuItem value="Fixed" primaryText="Fixed" />
                </SelectField>

                <div className="rangedp-wrapper">
                  <DateRangePicker onClickRange={this.props.onFilterChange} className="margin-md-left"
                    default={moment().startOf('years').format('YYYY')} ref="dp">
                    <i className="fa fa-caret-down margin-xs-left" />
                  </DateRangePicker>
                </div>

                <a href="javascript:;" title="Export" style={{display: 'none'}}><img
                  width="26" src="/images/btn-export.jpg"/></a>
              </div>
            </div>

            <div className="search-wrapper">
              <SearchBarContainer isSimple onSearch={this.props.onFilterChange}/>
            </div>

            <div className="width-280 flex-panel">
                <RaisedButton onTouchTap={this.props.onClickOpen.bind(this)} label="Open"/>
                <RaisedButton onTouchTap={this.props.onClickFixAll.bind(this)} label="Fix All"/>
                <RaisedButton
                  onTouchTap={this.props.openMore}
                  buttonStyle={primeButtonStyle}
                  labelStyle={primeLabelStyle}
                  label="More"
                />
                  <Popover
                    open={this.props.isMore}
                    anchorEl={this.props.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.props.closeMore}
                  >
                    <Menu>
                      <MenuItem primaryText="Add Incident" onTouchTap={this.props.onClickAddIncident}/>
                      <MenuItem primaryText="Add Exception" onTouchTap={this.props.onClickAddException}/>
                      <MenuItem primaryText="Export PDF" onTouchTap={this.props.onClickPDF}/>
                    </Menu>
                  </Popover>
            </div>

          </div>
        </TabPageHeader>

        <TabPageBody tabs={MainTabs(device.id)} tab={0}>
          {this.props.table}
          {this.props.addIncidentModalVisible &&
          <AddIncidentModal {...this.props} open device={this.props.device}/>}
          {this.props.openExceptionModal &&
          <AddExceptionModal open incident={selectedIncident}
            onClose={this.props.onCloseExceptionModal}/>}

          {this.props.commentModalVisible &&
          <CommentsModal incident={selectedIncident}
            onClose={this.props.onCloseCommentsModal}/>}

          <ReactTooltip />
        </TabPageBody>
      </TabPage>
    )
  }
}
