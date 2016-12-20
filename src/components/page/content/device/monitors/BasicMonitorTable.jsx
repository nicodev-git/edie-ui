import React from 'react'
import Griddle from 'griddle-react'
import ReactTooltip from 'react-tooltip'
import enStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import {connect} from 'react-redux'

import {fetchDeviceBasicMonitors} from 'actions/index'

class BasicMonitorTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }

        this.columns = [{
            "displayName": "Name",
            "columnName": "name",
        }, {
            "displayName": "OS",
            "columnName": "devicetype",
        }, {
            "displayName": "Hardware",
            "columnName": "cpuinfo",
            "customComponent": (props) => {
                var title = '';
                if (props.rowData.totalmemory) {
                    title = Math.floor(Math.round(props.rowData.totalmemory / 1024)) + 'GB';
                }

                return <span>{props.data || ''}<br/>{title || ''}</span>
            }
        }, {
            "displayName": "IP",
            "columnName": "ipaddress",
        }, {
            "displayName": "CPU",
            "columnName": "cpuusage",
            "customComponent": (props) => {
                let val = parseInt(props.data || 0);
                return this.progressbarFormatter(val);
            }
        }, {
            "displayName": "Memory",
            "columnName": "freememory",
            "customComponent": (props) => {
                var p = 0;
                var title;
                var row = props.rowData;
                if (row.totalmemory && row.usedmemory) {
                    p = parseInt(100 * row.usedmemory / row.totalmemory);
                    title = (row.usedmemory / 1024.0).toFixed(2) + ' GB'  + '/' +
                        (row.totalmemory / 1024.0).toFixed(2) + ' GB';
                }
                return this.progressbarFormatter(p, title);
            }
        }, {
            "displayName": "Disk",
            "columnName": "disk1freespace",
            "customComponent": (props) => {
                var td = '';
                var row = props.rowData;

                var divs = [];
                for(var i = 1; i <= 4; i++) {
                    var name = row['disk' + i + 'name'];
                    if (!name) continue;
                    var total = parseFloat(row['disk' + i + 'totalspace'] || 0).toFixed(1);
                    var free = parseFloat(row['disk' + i + 'freespace'] || 0).toFixed(1);

                    divs.push(this.progressbarFormatter(parseInt((total - free) * 100.0 / total) % 100,
                        name + " " + (total - free) + "GB/" + total + "GB", i));
                }
                return <div>{divs}</div>
            }
        }, {
            "displayName": "Health",
            "columnName": "agentLastSeen",
            "cssClassName": "text-center",
            "customComponent": (props) => {
                setTimeout(() => {
                    ReactTooltip.rebuild()
                }, 1)
                return this.healthFormatter(props.data)
            }
        }/*, {
         "displayName": "Actions",
         "columnName": "actions",
         "customComponent": (props) => {
         return this.actionFormatter(props.data)
         }
         }*/]

        this.formatter = buildFormatter(enStrings)
    }

    progressbarFormatter(val, title, key) {
        var color = 'red';
        var textcolor = 'black';
        if(val < 70) {
            color = 'green';
            //if (val > 40) textcolor = 'white';
        } else if(val < 90)
            color = '#fec835';

        return (
            <div key={key || title} className="progress" style={{height: "12px", position: "relative"}} title={title || ''}>
                <div className="progress-label"
                     style={{fontSize: "9px", top: "1px", textAlign: "center", position: "absolute",width: "100%", color:textcolor}}>{val}%</div>
                <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"
                    style={{width: val + '%', backgroundColor: color}}></div>
            </div>
        )
    }

    timeAgo(date) {
        var MINUTE = 60;
        var HOUR = MINUTE * 60;
        var DAY = HOUR * 24;
        var WEEK = DAY * 7;
        var MONTH = DAY * 30;
        var YEAR = DAY * 365;
        var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

        var then = new Date(date).valueOf();
        var now = Date.now();
        var seconds = Math.round(Math.abs(now - then) / 1000);
        var suffix = then < now ? 'ago' : 'from now';

        var _ref = seconds < MINUTE ? [Math.round(seconds), 'second'] : seconds < HOUR ? [Math.round(seconds / MINUTE), 'minute'] : seconds < DAY ? [Math.round(seconds / HOUR), 'hour'] : seconds < WEEK ? [Math.round(seconds / DAY), 'day'] : seconds < MONTH ? [Math.round(seconds / WEEK), 'week'] : seconds < YEAR ? [Math.round(seconds / MONTH), 'month'] : [Math.round(seconds / YEAR), 'year'];

        var _ref2 = _slicedToArray(_ref, 2);

        var value = _ref2[0];
        var unit = _ref2[1];

        return this.formatter(value, unit, suffix, then)
    }

    healthFormatter(val) {
        let status = 'down';
        let tooltip = 'Never seen'
        if (val) {
            let diff = new Date().getTime() - val;
            if (diff / (60 * 1000.0) <= 5) status = 'up'

            tooltip = 'Last seen ' + this.timeAgo(val)
        }

        var cls = 'fa-question';
        var color = '#FDB422';
        if(status == 'up'){
            cls = 'fa-check-square';
            color = 'green';
        } else if(status == 'down') {
            cls = 'fa-times';
            color = 'red';
        }

        return (
            <div style={{width:"100%", textAlign:"center"}}>
                <i className={"fa " + cls} style={{color: color, fontSize: "20px", verticalAlign: "middle"}} data-tip={tooltip}></i>
            </div>
        )
    }

    actionFormatter(val) {
        if (!val) return (<span></span>)
        return (
            <div style={{width:"100%", textAlign:"center",  marginTop: "-3px"}}>
                <a href="javascript:;">
                    <i className="fa fa-tasks" style={{color: "black", fontSize: "20px"}}></i>
                </a>
            </div>
        )
    }

    componentWillMount() {

        // $.get(Api.devices.getDevicesAndProps, {
        //     id: this.props.device.id
        // }).done(res => {
        //     if (!res.length) return
        //
        //     res.forEach(item => {
        //         if (item.id != this.props.device.id) return true
        //         this.setState({
        //             data: [item]
        //         })
        //         return false
        //     })
        // });


    }

    render() {
        return (
            <div>
                <Griddle
                    results={this.props.basicMonitors}
                    tableClassName="table tab-table"
                    showFilter={false}
                    showSettings={false}
                    columns={this.columns.map(item => item.columnName)}
                    columnMetadata={this.columns}
                    rowMetadata={{key: 'id'}}
                    useGriddleStyles={false}
                    bodyHeight={100}
                />
            </div>
        )
    }
}

BasicMonitorTable.defaultProps = {
    device: {}
}


function mapStateToProps(state) {
    let {basicMonitors} = state.devices
    return {basicMonitors}
}

export default connect(mapStateToProps, {fetchDeviceBasicMonitors})(BasicMonitorTable)