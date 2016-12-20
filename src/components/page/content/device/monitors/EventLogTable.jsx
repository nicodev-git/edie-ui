import React from 'react'
import { connect } from 'react-redux'

import {ResponsiveInfiniteTable} from 'components/shared/InfiniteTable.jsx'
import { fetchDeviceEventLog } from 'actions/index'

class EventLogTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [{
                "displayName": "Time",
                "columnName": "logtime",
                "cssClassName": "nowrap width-140",
            }, {
                "displayName": "LogName",
                "columnName": "logname",
                "cssClassName": "width-100",
            }, {
                "displayName": "EventID",
                "columnName": "eventid",
                "cssClassName": "width-80",
            }, {
                "displayName": "User",
                "columnName": "user",
                "cssClassName": "width-160",
            }, {
                    "displayName": "Data",
                "columnName": "data",
            }],

            url: "/devices/getEventLogsForDevice",
            params: {
                deviceid: this.props.device.id,
            },
        }
    }

    componentWillMount() {
        this.props.fetchDeviceEventLog()
    }

    render() {
        return (
            <ResponsiveInfiniteTable
                cells={this.state.columns}
                ref="table"
                rowMetadata={{"key": "id"}}
                bodyHeight={this.props.containerHeight}
                selectable={true}

                useExternal={false}
                data={this.props.eventLogs}
            />
        )
    }

    render2() {
        return (
            <InfiniteTable
                url={this.state.url}
                params={this.state.params}
                cells={this.state.columns}
                ref="table"
                rowMetadata={{"key": "id"}}
                selectable={true}
            />
        )
    }
}

EventLogTable.defaultProps = {
    device: {}
}

function mapStateToProps(state) {
    return {eventLogs: state.devices.eventLogs}
}

// export default EventLogTable
export default connect(mapStateToProps, {fetchDeviceEventLog})(EventLogTable)