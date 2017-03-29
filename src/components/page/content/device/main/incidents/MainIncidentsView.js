import React, { Component } from 'react'
import moment from 'moment'
import Select from 'react-select'
import { ButtonGroup, Button } from 'react-bootstrap'
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
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { underlineFocusStyle, inputStyle, selectedItemStyle } from 'style/materialStyles'

export default class MainIncidentsView extends Component {
  render () {
    const {device, incidents, selectedIndex} = this.props
    let options = [
      {value: '', label: 'Any'},
      {value: 'false', label: 'Unfixed'},
      {value: 'true', label: 'Fixed'}
    ]
    let selectedIncident = selectedIndex < 0 ? null : incidents[selectedIndex]
    return (
      <TabPage>
        <TabPageHeader title={device.name}>
          <div className="text-center margin-md-top">

            <div className="pull-left">
              <div className="form-inline">
                <Select
                  value={this.props.selectedSeverity.join(',')}
                  options={this.props.severities}
                  onChange={this.props.onChangeSeverity}
                  multi
                  clearable={false}
                  className="select-severity"
                  style={{minWidth: '85px'}}
                  searchable={false}
                  autosize={false}
                  backspaceRemoves={false}
                />

                <SelectField
                  underlineStyle={underlineFocusStyle}
                  selectedMenuItemStyle={selectedItemStyle}
                  menuItemStyle={inputStyle}
                  labelStyle={inputStyle}
                  onChange={this.props.onFilterChange}
                >
                  {options.map((option, index) =>
                    <MenuItem key={index} value={option.value} primaryText={option.label} />
                  )}
                </SelectField>

                {/* <select className="fixtype form-control inline text-primary margin-md-left"
                  style={{maxWidth: '150px'}}
                  onChange={this.props.onFilterChange}
                  ref="fixed" defaultValue="false">
                  <option value="">Any</option>
                  <option value="false">Unfixed</option>
                  <option value="true">Fixed</option>
                </select> */}

                <DateRangePicker onClickRange={this.props.onFilterChange} className="margin-md-left"
                  default={moment().startOf('years').format('YYYY')} ref="dp">
                  <i className="fa fa-caret-down margin-xs-left" />
                </DateRangePicker>

                <a href="javascript:;" title="Export" style={{display: 'none'}}><img
                  width="26" src="/images/btn-export.jpg"/></a>
              </div>
            </div>

            <div className="pull-right">
              <ButtonGroup>

                <Button onClick={this.props.onClickOpen.bind(this)}>Open</Button>

                <Button onClick={this.props.onClickFixAll}>Fix All</Button>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                  <MenuItem primaryText="Add Incident" onTouchTap={this.props.onClickAddIncident}/>
                  <MenuItem primaryText="Add Exception" onTouchTap={this.props.onClickAddException}/>
                  <MenuItem primaryText="Export PDF" onTouchTap={this.props.onClickPDF}/>
                </IconMenu>

                {/* <DropdownButton title="More" id="dd-dev-incidents" pullRight>

                  <MenuItem eventKey="1" onClick={this.props.onClickAddIncident}>
                    Add Incident
                  </MenuItem>

                  <MenuItem eventKey="2" onClick={this.props.onClickAddException}>
                    Add Exception
                  </MenuItem>

                  <MenuItem eventKey="3" onClick={this.props.onClickPDF}>
                    Export PDF
                  </MenuItem>

                </DropdownButton> */}

              </ButtonGroup>
            </div>

            <div style={{margin: '0 auto', position: 'relative', display: 'inline-block', textAlign: 'center'}}>
              <div className="inline" style={{position: 'relative'}}>
                <input type="text" placeholder="Search" className="form-control"
                  style={{width: '100%', paddingLeft: '35px'}}
                  onChange={this.props.onFilterChange}
                  ref="search"/>
                <a className="btn" href="javascript:;" style={{position: 'absolute', left: 0, top: 0}}>
                  <i className="fa fa-search" /></a>
              </div>
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
