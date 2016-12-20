import React from 'react'
import Griddle from 'griddle-react'
import TimeAgo from 'react-timeago'
import { connect} from 'react-redux'
import { assign, concat } from 'lodash'

import DeviceWizard from 'components/shared/wizard/DeviceWizard.jsx'
import { wizardConfig, deviceTypeMap } from 'components/shared/wizard/WizardConfig.jsx'

import { appendComponent, removeComponent } from 'util/Component'
import { findIndex, escape } from 'lodash'
import { showAlert, showPrompt, showConfirm } from 'components/shared/Alert.jsx'

import MonitorPicker from './MonitorPicker.jsx'
import MonitorHistoryModal from './MonitorHistoryModal.jsx'
import MonitorLogModal from './MonitorLogModal.jsx'

import {openDeviceMonitorPicker,
    openDeviceMonitorWizard, closeDeviceMonitorWizard,
    updateMapDevice
} from 'actions/index'

class MonitorTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: '',

            editMonitor: null,

            monitorConfig: null
        }

        this.columns = [{
            "displayName": "Monitor Name",
            "columnName": "name",
            "cssClassName": "nowrap",
        }, {
            "displayName": "Type",
            "columnName": "devicetype",
        }, {
            "displayName": "Result",
            "columnName": "devicestatustext",
            "customComponent": (props) => {
                try{
                    var statusObj = JSON.parse(val);
                    if(!statusObj['text']) return (<span></span>)
                    return (<span>{statusObj['text']}</span>);
                } catch (e) {}
                return (<span></span>)
            }
        }, {
            "displayName": "Status",
            "columnName": "devicestatus",
            "cssClassName": "text-center",
            "customComponent": (props) => {
                return this.healthFormatter(props.data)
            }
        }, {
            "displayName": "Last Seen",
            "columnName": "devicestatustimestamp",
            "cssClassName": "nowrap",
            "customComponent": (props) => {
                if (!props.data) return <span />
                return <TimeAgo date={props.data}/>
            }
        }, {
            "displayName": "Last Failed",
            "columnName": "lastfailed",
            "cssClassName": "nowrap",
            "customComponent": (props) => {
                if (!props.data) return <span />
                return <TimeAgo date={props.data}/>
            }

        }, {
            "displayName": "Actions",
            "columnName": "action",
            "customComponent": (props) => {
                let row = props.rowData
                let devtype = row.type;

                return (
                    <span>
                        <a href="javascript:;" className="option">
                            <i className="fa fa-comment" data-tip={row.devicestatustext}></i>
                        </a>
                        <a href="javascript:;" className="option" onClick={this.onClickCal.bind(this, props.rowData)}>
                            <i className="fa fa-calendar-o" data-tip="History"></i>
                        </a>
                    {
                        (devtype == "LogFile" || devtype == "LogCheck") ?
                            <a href="javascript:;" className="option" onClick={this.onClickLog.bind(this, props.rowData)}>
                                <i className="fa fa-list" title="Log"></i></a>
                            : null
                    }
                    </span>
                );
            }
        }]
    }

    healthFormatter(val) {
        var cls = 'fa-question';
        var color = '#FDB422';
        if(val == 'up'){
            cls = 'fa-check-square';
            color = 'green';
        } else if(val == 'down') {
            cls = 'fa-times';
            color = 'red';
        }
        return (
            <div style={{width:"100%", textAlign:"center"}}>
                <i className={"fa " + cls}
                   style={{color: color, fontSize: "20px", verticalAlign: "middle"}}></i>
            </div>
        )
    }

    lastSeenDateFormatter(date, display) {
        if (!date) return "";

        var diff = (new Date() - new Date(date)) / 1000;
        diff = diff.toFixed(0);
        if(diff < 1) diff = 1;
        var label = "";

        if(diff < 60) {
            label =  diff + (diff > 1 ? " seconds" : " second") + " ago";
        } else if(diff < 3600) {
            diff = parseInt(diff / 60);
            if(diff == 1)
                label = diff + " minute ago" ;
            else
                label = diff + " minutes ago" ;
        } else {
            diff = parseInt(diff / 3600);
            if(diff == 1)
                label = diff + " hour ago" ;
            else
                label = diff + " hours ago" ;
        }

        return label;
    }

    render() {
        return (
            <div className="flex-1">
                <Griddle
                    results={this.props.device.monitors}
                    tableClassName="table tab-table"
                    showFilter={false}
                    showSettings={false}
                    columns={this.columns.map(item => item.columnName)}
                    columnMetadata={this.columns}
                    rowMetadata={{key: 'name', "bodyCssClassName": this.getBodyCssClassName.bind(this)}}
                    useGriddleStyles={false}
                    resultsPerPage={100}
                    useFixedHeader={false}
                    onRowClick={this.onRowClick.bind(this)}
                    onRowDblClick={this.onRowDblClick.bind(this)}
                    bodyHeight={this.props.containerHeight}
                />

                {this.renderMonitorPicker()}

                {this.renderMonitorWizard()}
            </div>
        )
    }

    renderMonitorPicker() {
        if (!this.props.monitorPickerVisible) return null

        return (
            <MonitorPicker
                onClickItem={monitorConfig => {
                    this.setState({monitorConfig}, () => {
                        this.addMonitor()
                    })
                    return true
                }}
            />
        )
    }

    renderMonitorWizard() {
        if (!this.props.monitorWizardVisible) return null

        const {monitorConfig} = this.state
        const type = 'monitor-custom'
        return (
            <DeviceWizard
                deviceType={type}
                title={monitorConfig ? monitorConfig.name : ''}
                onClose={() => {
                    this.props.closeDeviceMonitorWizard()
                }}
                onStep0={this.onStep0.bind(this)}
                extraParams={{}}
                configParams={{}}
                onFinish={this.onFinishMonitorWizard.bind(this)}
            />
        )
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onRowClick(row) {
        this.setState({
            selected: row.props.data
        })
    }

    getBodyCssClassName(data) {
        if (this.state.selected == data)
            return "selected"
        return ""
    }

    onRowDblClick() {
        this.onClickEditMonitor()
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onClickCal(row) {
        let data = row;

        //MonitorHistoryModal
        appendComponent(
            <MonitorHistoryModal
                device={ data }
                onClose={ removeComponent }
            />
        )
    }

    onClickLog(row) {
        let data = row;

        // appendComponent(
        //     <MonitorLogModal
        //         device={ data }
        //         father={ this.props.device }
        //         onClose={ removeComponent }
        //         />
        // )

        emit(EVENTS.DEV_MONITOR_LOG_CLICKED, data, this.props.device)
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    onClickAddMonitor() {
        this.showMonitorAdd()
    }

    showMonitorAdd() {
        this.setState({ editMonitor: null }, () => {
            this.props.openDeviceMonitorPicker()
        })
    }

    addMonitor(type){
        this.props.openDeviceMonitorWizard()
        return true;
    }

    onFinishMonitorWizard(res, params) {
        var editMonitor = this.state.editMonitor
        let device = assign({}, this.props.device)
        let monitor = assign({}, editMonitor, params)

        if (editMonitor) {
            //Edit
            const index = device.monitors.indexOf(editMonitor)
            if (index >= 0) device.monitors[index] = monitor
        } else {
            //Add

            const {monitorConfig} = this.state
            assign(monitor, {
                monitortype: monitorConfig.monitortype
            })

            device.monitors = concat(device.monitors || [], monitor)
        }

        this.props.updateMapDevice(device)
        this.props.closeDeviceMonitorWizard()
    }

    onStep0() {
        this.onClickAddMonitor()
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onClickEditMonitor() {
        var selected = this.state.selected;

        if (!selected) return showAlert("Please select monitor.")

        this.setState({ editMonitor: selected }, () => {
            this.props.openDeviceMonitorWizard(selected)
        })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    editPortMonitors(type) {

    }

    onFinishPorts(res, req) {

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    onClickDeleteMonitor() {
        var data = this.state.selected;
        if (!data) return showAlert("Please choose monitor.")

        let device = assign({}, this.props.device)
        const index = device.monitors.indexOf(data)
        if (index >= 0) device.monitors.splice(index, 1)

        this.props.updateMapDevice(device)
    }
}


function mapStateToProps(state) {
    return {
        monitorPickerVisible: state.devices.monitorPickerVisible,
        monitorWizardVisible: state.devices.monitorWizardVisible,
        device: state.dashboard.selectedDevice

    }
}

const actions = {
    openDeviceMonitorPicker,
    openDeviceMonitorWizard,
    closeDeviceMonitorWizard,
    updateMapDevice
}

export default connect(mapStateToProps, actions, null, { withRef: true })(MonitorTable)