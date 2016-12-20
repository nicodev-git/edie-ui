import React from 'react'
import TimeAgo from 'react-timeago'
import moment from 'moment'
import {
    ButtonGroup,
    Button,
    DropdownButton,
    MenuItem
} from 'react-bootstrap'

import {findIndex, assign} from 'lodash'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'

import InfiniteTable from 'components/shared/InfiniteTable.jsx'

class Agents extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            install: 'all',
            tabIndex: 1,
        }

        this.state.cellAgents = [{
            "displayName": "Name",
            "columnName": "name",
        }, {
            "displayName": "Map",
            "columnName": "mapName",
        }, {
            "displayName": "OS",
            "columnName": "osname",
        }, {
            "displayName": "Agent",
            "columnName": "agentLastSeen",
            "customComponent": (props) => {
                let val = props.data
                let installed = false;
                if (val) {
                    let diff = new Date().getTime() - val;
                    installed = diff <= 3600 * 1000;
                }

                if (installed) return <span>Installed</span>
                return <span>Not Installed</span>
            },
        }, {
            "displayName": "Version",
            "columnName": "agentVersion",
            "customComponent": (props) => {
                let val = props.data
                let installed = false

                if (props.rowData.agentLastSeen) {
                    var diff = new Date().getTime() - props.rowData.agentLastSeen;
                    installed = diff <= 3600 * 1000;
                }

                return <span>{installed ? val : ''}</span>
            },
        }, {
            "displayName": "Last Seen",
            "columnName": "agentExist",
            "customComponent": (props) => {
                let val = props.rowData.agentLastSeen
                if (!val) return <span></span>
                return <TimeAgo date={val} />
            },
        }, {
            "displayName": "Action",
            "columnName": "agentUUID",
            "customComponent": (props) => {
                const row = props.rowData
                return (
                    <div>
                        <a href="javascript:;" onClick={this.showAgentConfigModal.bind(this, row)}>
                            <i className="fa fa-edit fa-x"></i></a>
                        <a href="javascript:;" className="margin-md-left"
                           onClick={this.downloadAgentConfig.bind(this, row)}>
                            <i className="fa fa-download fa-x"></i></a>
                    </div>
                )
            },
        }]

        this.state.cellCollectors = [{
            "displayName": "Name",
            "columnName": "name",
        }, {
            "displayName": "OS",
            "columnName": "hostname",//osname
            "customComponent": (props) => {
                return <span></span>
            }
        }, {
            "displayName": "Agent",
            "columnName": "proxyHost",//lastSeen
            "customComponent": (props) => {
                return <span></span>
                // let val = props.data
                // let installed = false;
                // if (val) {
                //     let diff = new Date().getTime() - val;
                //     installed = diff / (3600 * 1000.0) <= 1;
                // }
                //
                // if (installed) return <span>Installed</span>
                // return <span>Not Installed</span>
            },
        }, {
            "displayName": "Version",
            "columnName": "version",
            "customComponent": (props) => {
                let val = props.data
                let installed = false

                if (props.rowData.lastSeen) {
                    var diff = new Date().getTime() - props.rowData.lastSeen;
                    installed = diff <= 3600 * 1000;
                }

                return <span>{installed ? val : ''}</span>
            },
        }, {
            "displayName": "Last Seen",
            "columnName": "type",
            "customComponent": (props) => {
                let val = props.rowData.lastSeen
                if (!val) return <span></span>
                return <TimeAgo date={val} />
            },
        }]


        this.state.cellLog = [{
            "displayName": "Severity",
            "columnName": "severity",
        }, {
            "displayName": "Time",
            "columnName": "mydatetime",
            "customComponent": (props) => {
                return <span>{moment(new Date(props.data)).format('YYYY-MM-DD HH:mm:ss')}</span>
            }
        }, {
            "displayName": "Category",
            "columnName": "category",
        }, {
            "displayName": "Message",
            "columnName": "message",
        }]
    }

    render() {
        let table
        const {tabIndex} = this.state
        return (
            <TabPage>
                <TabPageHeader title="Settings">
                    <div className="text-center margin-md-top">
                        <div className="pull-left form-inline">
                            <select className={"form-control " + (tabIndex == 1 ? "" : "hidden")}
                                    onChange={this.onChangeInstall.bind(this)}>
                                <option value="all">All</option>
                                <option value="installed">Installed</option>
                                <option value="notinstalled">Not Installed</option>
                            </select>
                        </div>

                        <div style={{position:"absolute", right:"25px"}}>
                            <ButtonGroup className={tabIndex == 1 ? "" : "hidden"}>

                                <Button>Default Config</Button>
                                <Button>Edit Config</Button>
                                <Button>Download Config</Button>

                            </ButtonGroup>

                            <ButtonGroup className={tabIndex == 2 ? "" : "hidden"}>

                                <Button>Add Collector</Button>
                                <Button>Edit Collector</Button>
                                <Button>Remove Collector</Button>
                                <Button>Edit Config</Button>
                                <Button>Download Config</Button>

                            </ButtonGroup>

                            <DropdownButton title={<i className="fa fa-gear"/>} id="dd-setting-agents" pullRight={true}>

                                <MenuItem eventKey="1" onClick={this.onClickAgentTab.bind(this, 1)}>
                                    <span className={tabIndex == 1 ? "text-bold" : ""}>Agents</span>
                                </MenuItem>

                                <MenuItem eventKey="2" onClick={this.onClickAgentTab.bind(this, 2)}>
                                    <span className={tabIndex == 2 ? "text-bold" : ""}>Collectors</span>
                                </MenuItem>

                                <MenuItem eventKey="3" onClick={this.onClickAgentTab.bind(this, 3)}>
                                    <span className={tabIndex == 3 ? "text-bold" : ""}>Agent Logs</span>
                                </MenuItem>

                            </DropdownButton>
                        </div>
                    </div>
                </TabPageHeader>

                <TabPageBody tabs={SettingTabs} tab={1}>

                </TabPageBody>
            </TabPage>
        )
    }

    render2() {
        let table
        const {tabIndex} = this.state

        if (tabIndex == 1) {
            table = (
                <InfiniteTable
                    url="/devices/getAgentDevicesDT"
                    params={{
                        installed: this.state.install
                    }}
                    cells={this.state.cellAgents}
                    rowMetadata={{"key": "id"}}
                    selectable={true}
                    bodyHeight={this.props.containerHeight}
                    pageSize={500}
                    ref="agents"

                    onRowDblClick={this.onClickEditAgentConfig.bind(this)}
                />
            )
        } else if (tabIndex == 2) {
            table = (
                <InfiniteTable
                    url="/devices/getAgentsTable"
                    params={{}}
                    cells={this.state.cellCollectors}
                    rowMetadata={{"key": "id"}}
                    selectable={true}
                    bodyHeight={this.props.containerHeight}
                    ref="collectors"
                />
            )
        } else if (tabIndex == 3) {
            table = (
                <InfiniteTable
                    url="/admin/getAgentsLogs"
                    params={{}}
                    cells={this.state.cellLog}
                    rowMetadata={{"key": "idagentslog"}}
                    selectable={true}
                    bodyHeight={this.props.containerHeight}
                    ref="agentlogs"
                />
            )
        }

        return (
            <div>
                {table}
            </div>
        )
    }

    onChangeInstall(install) {
        this.setState({ install })
    }

    onChangeAgentTab(tabIndex) {
        this.setState({ tabIndex })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    onClickEditAgentConfig() {
        let selected = this.refs.agents.getSelected()
        if (!selected) return showAlert("Please choose agent.")

        this.showAgentConfigModal(selected)
    }

    showAgentConfigModal(data) {

        $.get(Api.admin.getOptions, {

        }).done(res => {
            const index = findIndex(res.data, {name: 'agent_default_config'})
            if (index < 0) return alert("No default agent config.")

            let defaultConfig = null
            try {
                defaultConfig = JSON.parse(res.data[index].value)
            } catch (e) {}


            let config = null

            if (data) {
                try {
                    config = assign({}, defaultConfig, JSON.parse(data.agentconfig))
                } catch (e) {}
            }

            if (!config) config = defaultConfig


            appendComponent(
                <AgentConfigModal
                    agent={data}
                    config={config}
                    onClose={(modal) => {
                        removeComponent(modal)
                        this.refs.agents.refresh()
                    }}/>
            )
        })
    }

    onClickDefaultAgentConfig() {
        this.showAgentConfigModal(null)
    }

    onClickDlAgentConfig() {
        let selected = this.refs.agents.getSelected()
        if (!selected) return showAlert("Please choose agent.")

        this.downloadAgentConfig(selected)

    }

    downloadAgentConfig(selected) {
        var url = Api.devices.downloadAgentConfig + '?id=' + selected.id+"&server=" + document.location.hostname;
        window.open(url, '_blank');
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////

    onClickAddCollector() {

    }

    onClickEditCollector() {

    }

    onClickRemoveCollector() {

    }

    onClickEditCollectorConfig() {

    }

    onClickDlCollectorConfig() {

    }

    onClickAgentTab() {

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
}

Agents.defaultProps = {}

export default Agents