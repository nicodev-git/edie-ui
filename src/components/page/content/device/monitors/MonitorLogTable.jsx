import React from 'react'

import InfiniteTable from 'components/shared/InfiniteTable.jsx'

class MonitorLogTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedType: '',
            selectedFile: '',
            keyword: '',
            heb7: false
        }

        //

        this.listeners = {
            [EVENTS.DEV_MONITOR_LOG_FILTER_CHANGED]: this.onFilterChanged.bind(this),
        }

        this.cellAll = [{
            "displayName": "_",
            "columnName": "line",
        }]

        this.cellError = [{
            "displayName": "_",
            "columnName": "logfileline",
        }, {
            "displayName": "_",
            "columnName": "filename",
        }]
    }

    componentDidMount() {
        listen(this.listeners)
    }

    componentWillUnmount() {
        unlisten(this.listeners)
    }

    render() {
        const {selectedType, selectedFile, keyword, heb7} = this.state

        if (selectedType == 'error') {
            return (
                <InfiniteTable
                    url="/logs/getErrorsInLog"
                    params={{
                        id: this.props.device.id,
                        filename: selectedFile,
                        search: keyword,
                        heb7: heb7
                    }}
                    cells={this.cellError}
                    bodyHeight={400}
                />
            )
        } else if (selectedType == 'all') {
            return (
                <InfiniteTable
                    url="/logs/getLogContent"
                    params={{
                        id: this.props.device.id,
                        filename: selectedFile,
                        search: keyword,
                        heb7: heb7
                    }}
                    cells={this.cellAll}
                    bodyHeight={400}
                />
            )
        }

        return null
    }

    onFilterChanged(filter) {
        this.setState(filter)
    }
}

MonitorLogTable.defaultProps = {
    device: {},
    father: {},
}

export default MonitorLogTable