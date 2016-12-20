import React from 'react'
import Dimensions from 'react-dimensions'
import {
    ButtonGroup,
    Button,
    Tabs,
    Tab
} from 'react-bootstrap'

import InfiniteTable from  'components/shared/InfiniteTable.jsx'

import { showAlert, showPrompt, showConfirm } from 'components/shared/Alert.jsx'

import SearchTabs from './SearchTabs'
import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'

class Devices extends React.Component {
    constructor(props) {
        super(props)

        this.cellIPs = [{
            "displayName": "Name",
            "columnName": "name",
        }, {
            "displayName": "IP",
            "columnName": "ipaddress",
        }, {
            "displayName": "Segment",
            "columnName": "segment",
        }, {
            "displayName": "Hostname",
            "columnName": "hostname",
        }]
    }

    render() {
        return (
            <TabPage>
                <TabPageHeader title="Search">
                    <div style={{margin: "0 auto", position: 'relative', textAlign: 'center'}}>
                        <div className="pull-right">
                            <Button>Open</Button>
                        </div>


                        <div style={{ position: "relative", display: "inline-block"}}>
                            <input type="text" placeholder="Search" className="form-control"
                                   style={{width: "220px", paddingLeft: "35px"}}
                                   ref="search"/>
                            <a className="btn" href="javascript:;" style={{position: "absolute", left: 0, top: 0}}>
                                <i className="fa fa-search"></i>
                            </a>
                        </div>
                    </div>
                </TabPageHeader>

                <TabPageBody tabs={SearchTabs} tab={1}>

                </TabPageBody>
            </TabPage>
        )
    }

    renderTable() {
        return (
            <InfiniteTable
                url="/bi/searchDevicesDT"
                params={this.props.filter || {search: ''}}
                cells={this.cellIPs}
                ref="table"
                rowMetadata={{"key": "id"}}
                selectable={true}
                bodyHeight={this.props.containerHeight}
                onRowDblClick={this.onRowDblClick.bind(this)}
            />
        )
    }

    onClickOpenDevice() {
        const selected = this.refs.table.getSelected()
        if (!selected) return showAlert("Please choose device.")

        emit(EVENTS.MAP_DEVICE_CLICKED, selected)
    }

    onRowDblClick(selected) {
        emit(EVENTS.MAP_DEVICE_CLICKED, selected)
    }
}

Devices.defaultProps = {
    filter: null
}

export default Devices