import React from 'react'
import Dimensions from 'react-dimensions'
import TimeAgo from 'react-timeago'

import {ResponsiveInfiniteTable} from 'components/shared/InfiniteTable.jsx'
import ProcessModal from './ProcessModal.jsx'
import { appendComponent, removeComponent } from 'util/Component'

class ProcessTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "/incidentstable/getProcessDT",
            params: {
                deviceid: this.props.device.id,
                search: '',
            },
        }

        this.columns = [{
            "displayName": "Name",
            "columnName": "name",
            //"cssClassName": "nowrap",
            "cssClassName": "width-180",
        }, {
            "displayName": "Id",
            "columnName": "id",
            "cssClassName": "width-180",
        }, {
            "displayName": "Owner",
            "columnName": "owner",
            "cssClassName": "width-180",
        }, {
            "displayName": "Parent",
            "columnName": "parent",
            "cssClassName": "width-180",
        }, {
            "displayName": "FilePath",
            "columnName": "filepath",
        }, {
            "displayName": "Status",
            "columnName": "status",
            "cssClassName": "width-120",
        }, {
            "displayName": "LastSeen",
            "columnName": "updated",
            "customComponent": (props) => {
                if (!props.data) return <span></span>

                return <TimeAgo date={props.data} />
            },
            "cssClassName": "width-180"
        }]
    }

    render() {
        return (
            <ResponsiveInfiniteTable
                cells={this.columns}
                ref="table"
                rowMetadata={{"key": "id"}}
                selectable={true}

                onRowDblClick={this.onRowDblClick.bind(this)}

                useExternal={false}
                data={[]}
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
                bodyHeight={this.props.containerHeight}
                selectable={true}
                onRowDblClick={this.onRowDblClick.bind(this)}
            />
        )
    }

    onRowDblClick() {
        const selected = this.refs.table.refs.wrappedInstance.getSelected()
        appendComponent(
            <ProcessModal process={selected} onClose={removeComponent}/>
        )
    }
}

ProcessTable.defaultProps = {
    device: {}
}

export default ProcessTable