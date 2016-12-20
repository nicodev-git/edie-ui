import React from 'react'
import DateRangePicker from 'components/shared/DateRangePicker.jsx'
import Select from 'react-select'
import moment from 'moment'
import {
    DropdownButton,
    ButtonGroup,
    MenuItem,
    Button
} from 'react-bootstrap'

import DeviceSearchModal from './DeviceSearchModal.jsx'

import { appendComponent, removeComponent } from 'util/Component.jsx'
import { showAlert, showConfirm } from 'components/shared/Alert.jsx'


class IncidentOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            severities: [
                { label: 'High', value: 'High'},
                { label: 'Medium', value: 'Medium'},
                { label: 'Low', value: 'Low'},
                { label: 'Audit', value: 'Audit'},
                { label: 'Ignore', value: 'Ignore'},
            ],

            selectedSeverity: ['High','Medium'],
            selectedDevices: [],
        }

        this.onFilterChange = this.onFilterChange.bind(this)
    }

    componentWillMount() {
        this.loadDevices()
    }

    componentDidMount() {


        setTimeout(() => {
            this.onFilterChange()
        }, 100)
    }

    loadDevices() {
        $.get(Api.bi.searchDevicesDT, {
            draw: 1,
            start: 0,
            length: 1000,
            search: '',
        }).done(res => {
            this.setState({
                devices: res.data.map(item => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })
            })
        }).fail(() => {

        })
    }

    render() {
        const {filterType} = this.props
        
        let defaultDate = moment().startOf("years").format("YYYY")
        
        if (filterType == 'today') {
            defaultDate = "Today"
        } else if (filterType == 'month') {
            defaultDate = moment().startOf("month").format("MMMM")
        }

        return (
            <div className="tab-header">
                <div>
                    <span className="tab-title">Search</span>
                </div>
                <div className="text-center margin-md-top" >

                    <div className="form-inline" style={{position: 'absolute'}}>

                        <div className="text-left"
                             style={{"verticalAlign": "middle", "lineHeight": 2.2}}>
                            <Select
                                value={this.state.selectedSeverity.join(',')}
                                options={this.state.severities}
                                onChange={this.onChangeSeverity.bind(this)}
                                multi={true}
                                clearable={false}
                                className="select-severity"
                                style={{minWidth: "85px"}}
                                searchable={false}
                                autosize={false}
                            />

                            <select className="form-control inline text-primary margin-md-left"
                                    onChange={this.onFilterChange}
                                    ref="fixed" defaultValue="false">
                                <option value="">Any</option>
                                <option value="false">Unfixed</option>
                                <option value="true">Fixed</option>
                            </select>

                            <DateRangePicker onClickRange={this.onFilterChange} className="margin-md-left"
                                             default={defaultDate} ref="dp">
                                <i className="fa fa-caret-down margin-xs-left"></i>
                            </DateRangePicker>


                            {this.renderDeviceSearch()}
                        </div>
                    </div>

                    <div style={{ position: "relative", display: "inline-block"}}>
                        <input type="text" placeholder="Search" className="form-control"
                               style={{width: "220px", paddingLeft: "35px"}}
                               onChange={this.onSearchKeyUp.bind(this)}
                               ref="search"/>
                        <a className="btn" href="javascript:;" style={{position: "absolute", left: 0, top: 0}}>
                            <i className="fa fa-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    renderDeviceSearch() {

        const {selectedDevices} = this.state
        let label = 'All Devices'

        if (selectedDevices.length == 0) {
            label = 'All Devices'
        } else if (selectedDevices.length == 1) {
            label = selectedDevices[0].name
        } else {
            label = selectedDevices.length + ' Devices'
        }
        //if (selectedDevices.length)

        return (
            <a href="javascript:;" className="margin-md-left"
               onClick={this.onClickSearchDevice.bind(this)}>
                {label}
            </a>
        )
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onChangeSeverity(selected) {
        this.setState({
            selectedSeverity: selected.map(item => item.value)
        }, () => {
            this.onFilterChange()
        })
    }

    onFilterChange() {
        this.props.onFilterChange &&
            this.props.onFilterChange(this.getOptions())
    }

    onSearchKeyUp(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.onFilterChange()
        }, 200)
    }

    onClickSearchDevice() {
        appendComponent(
            <DeviceSearchModal
                devices={this.state.selectedDevices}
                onClose={this.onCloseSearchDevice.bind(this)}/>
        )
    }

    onCloseSearchDevice(modal, selectedDevices) {
        removeComponent(modal)

        if (!selectedDevices) return

        this.setState({selectedDevices}, () => {
            this.onFilterChange()
        })
    }

    ////////////////////////////////////////////////////////////

    getOptions() {

        const refs = this.refs
        const {search, fixed, dp} = refs

        return {
            text: search ? search.value : '',
            severity: this.state.selectedSeverity,
            fixed: fixed ? fixed.value : -1,
            startTime: dp ? dp.getStartDate().format("YYYY-MM-DD HH:mm:ss") : '',
            endTime: dp ? dp.getEndDate().format("YYYY-MM-DD HH:mm:ss") : '',

            devices: this.state.selectedDevices.map(item => item.id)
        }

    }
}

IncidentOptions.defaultProps = {
    onFilterChange: null,
    filterType: null,
}

export default IncidentOptions